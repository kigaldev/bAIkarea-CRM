const {
  RepairOrder,
  RepairOrderItem,
  Customer,
  Bicycle,
  User,
  WorkshopOperation,
  sequelize,
} = require("../models");
const { logger } = require("../utils/logger");
const { Op } = require("sequelize");

/**
 * Get all repair orders
 * @route GET /api/repairs
 * @access Private
 */
const getRepairs = async (req, res) => {
  try {
    const {
      status,
      customerId,
      technicianId,
      startDate,
      endDate,
      limit = 10,
      offset = 0,
    } = req.query;

    // Build query options
    const options = {
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
      include: [
        { model: Customer },
        { model: Bicycle },
        { model: User, as: "assignedTechnician" },
      ],
    };

    // Build where clause
    const where = {};

    if (status) {
      where.status = status;
    }

    if (customerId) {
      where.customerId = customerId;
    }

    if (technicianId) {
      where.assignedTechnicianId = technicianId;
    }

    // Date range filter
    if (startDate && endDate) {
      where.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    } else if (startDate) {
      where.createdAt = {
        [Op.gte]: new Date(startDate),
      };
    } else if (endDate) {
      where.createdAt = {
        [Op.lte]: new Date(endDate),
      };
    }

    if (Object.keys(where).length > 0) {
      options.where = where;
    }

    // Get repair orders with pagination
    const { count, rows } = await RepairOrder.findAndCountAll(options);

    res.status(200).json({
      total: count,
      repairs: rows,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (error) {
    logger.error(`Error in getRepairs: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get repair order by ID
 * @route GET /api/repairs/:id
 * @access Private
 */
const getRepairById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find repair order by ID
    const repair = await RepairOrder.findByPk(id, {
      include: [
        { model: Customer },
        { model: Bicycle },
        { model: User, as: "assignedTechnician" },
        {
          model: RepairOrderItem,
          as: "items",
          include: [{ model: WorkshopOperation }],
        },
      ],
    });

    if (!repair) {
      return res.status(404).json({ message: "Repair order not found" });
    }

    res.status(200).json(repair);
  } catch (error) {
    logger.error(`Error in getRepairById: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Create a new repair order
 * @route POST /api/repairs
 * @access Private
 */
const createRepair = async (req, res) => {
  // Start a transaction
  const transaction = await sequelize.transaction();

  try {
    const {
      customerId,
      bicycleId,
      issueDescription,
      priority,
      assignedTechnicianId,
      estimatedCompletionDate,
      notes,
      items,
    } = req.body;

    // Check if customer exists
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      await transaction.rollback();
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check if bicycle exists
    const bicycle = await Bicycle.findByPk(bicycleId);
    if (!bicycle) {
      await transaction.rollback();
      return res.status(404).json({ message: "Bicycle not found" });
    }

    // Check if technician exists if provided
    if (assignedTechnicianId) {
      const technician = await User.findByPk(assignedTechnicianId);
      if (!technician || technician.role !== "technician") {
        await transaction.rollback();
        return res.status(404).json({ message: "Technician not found" });
      }
    }

    // Create repair order
    const repair = await RepairOrder.create(
      {
        customerId,
        bicycleId,
        issueDescription,
        priority: priority || "medium",
        assignedTechnicianId,
        estimatedCompletionDate,
        notes,
        status: "pending",
      },
      { transaction },
    );

    // Add repair items if provided
    let totalPrice = 0;

    if (items && items.length > 0) {
      for (const item of items) {
        // Check if operation exists if operationId is provided
        if (item.operationId) {
          const operation = await WorkshopOperation.findByPk(item.operationId);
          if (!operation) {
            await transaction.rollback();
            return res
              .status(404)
              .json({
                message: `Operation with ID ${item.operationId} not found`,
              });
          }

          // Use operation price if not overridden
          if (!item.price) {
            item.price = operation.finalPrice;
          }
        }

        // Create repair order item
        const repairItem = await RepairOrderItem.create(
          {
            repairOrderId: repair.id,
            operationId: item.operationId,
            customDescription: item.customDescription,
            price: item.price,
            quantity: item.quantity || 1,
            // totalPrice is calculated in the model hook
          },
          { transaction },
        );

        totalPrice += parseFloat(repairItem.totalPrice);
      }

      // Update repair order with total price
      await repair.update({ totalPrice }, { transaction });
    }

    // Commit transaction
    await transaction.commit();

    // Get repair with all related data
    const createdRepair = await RepairOrder.findByPk(repair.id, {
      include: [
        { model: Customer },
        { model: Bicycle },
        { model: User, as: "assignedTechnician" },
        {
          model: RepairOrderItem,
          as: "items",
          include: [{ model: WorkshopOperation }],
        },
      ],
    });

    res.status(201).json(createdRepair);
  } catch (error) {
    // Rollback transaction on error
    await transaction.rollback();
    logger.error(`Error in createRepair: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Update repair order status
 * @route PUT /api/repairs/:id/status
 * @access Private
 */
const updateRepairStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, completedDate } = req.body;

    // Find repair order by ID
    const repair = await RepairOrder.findByPk(id);

    if (!repair) {
      return res.status(404).json({ message: "Repair order not found" });
    }

    // Update status
    const updates = { status };

    // If status is completed, set completedDate
    if (status === "completed" && !repair.completedDate) {
      updates.completedDate = completedDate || new Date();
    }

    await repair.update(updates);

    // Get updated repair with all related data
    const updatedRepair = await RepairOrder.findByPk(id, {
      include: [
        { model: Customer },
        { model: Bicycle },
        { model: User, as: "assignedTechnician" },
      ],
    });

    res.status(200).json(updatedRepair);
  } catch (error) {
    logger.error(`Error in updateRepairStatus: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Update repair order
 * @route PUT /api/repairs/:id
 * @access Private
 */
const updateRepair = async (req, res) => {
  // Start a transaction
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const {
      customerId,
      bicycleId,
      issueDescription,
      priority,
      assignedTechnicianId,
      estimatedCompletionDate,
      notes,
      items,
    } = req.body;

    // Find repair order by ID
    const repair = await RepairOrder.findByPk(id);

    if (!repair) {
      await transaction.rollback();
      return res.status(404).json({ message: "Repair order not found" });
    }

    // Check if customer exists if provided
    if (customerId) {
      const customer = await Customer.findByPk(customerId);
      if (!customer) {
        await transaction.rollback();
        return res.status(404).json({ message: "Customer not found" });
      }
    }

    // Check if bicycle exists if provided
    if (bicycleId) {
      const bicycle = await Bicycle.findByPk(bicycleId);
      if (!bicycle) {
        await transaction.rollback();
        return res.status(404).json({ message: "Bicycle not found" });
      }
    }

    // Check if technician exists if provided
    if (assignedTechnicianId) {
      const technician = await User.findByPk(assignedTechnicianId);
      if (!technician || technician.role !== "technician") {
        await transaction.rollback();
        return res.status(404).json({ message: "Technician not found" });
      }
    }

    // Update repair order
    await repair.update(
      {
        customerId: customerId || repair.customerId,
        bicycleId: bicycleId || repair.bicycleId,
        issueDescription: issueDescription || repair.issueDescription,
        priority: priority || repair.priority,
        assignedTechnicianId:
          assignedTechnicianId !== undefined
            ? assignedTechnicianId
            : repair.assignedTechnicianId,
        estimatedCompletionDate:
          estimatedCompletionDate || repair.estimatedCompletionDate,
        notes: notes !== undefined ? notes : repair.notes,
      },
      { transaction },
    );

    // Update repair items if provided
    if (items) {
      // Delete existing items
      await RepairOrderItem.destroy({
        where: { repairOrderId: repair.id },
        transaction,
      });

      // Add new items
      let totalPrice = 0;

      for (const item of items) {
        // Check if operation exists if operationId is provided
        if (item.operationId) {
          const operation = await WorkshopOperation.findByPk(item.operationId);
          if (!operation) {
            await transaction.rollback();
            return res
              .status(404)
              .json({
                message: `Operation with ID ${item.operationId} not found`,
              });
          }

          // Use operation price if not overridden
          if (!item.price) {
            item.price = operation.finalPrice;
          }
        }

        // Create repair order item
        const repairItem = await RepairOrderItem.create(
          {
            repairOrderId: repair.id,
            operationId: item.operationId,
            customDescription: item.customDescription,
            price: item.price,
            quantity: item.quantity || 1,
            // totalPrice is calculated in the model hook
          },
          { transaction },
        );

        totalPrice += parseFloat(repairItem.totalPrice);
      }

      // Update repair order with total price
      await repair.update({ totalPrice }, { transaction });
    }

    // Commit transaction
    await transaction.commit();

    // Get updated repair with all related data
    const updatedRepair = await RepairOrder.findByPk(id, {
      include: [
        { model: Customer },
        { model: Bicycle },
        { model: User, as: "assignedTechnician" },
        {
          model: RepairOrderItem,
          as: "items",
          include: [{ model: WorkshopOperation }],
        },
      ],
    });

    res.status(200).json(updatedRepair);
  } catch (error) {
    // Rollback transaction on error
    await transaction.rollback();
    logger.error(`Error in updateRepair: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Delete repair order
 * @route DELETE /api/repairs/:id
 * @access Private
 */
const deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;

    // Find repair order by ID
    const repair = await RepairOrder.findByPk(id);

    if (!repair) {
      return res.status(404).json({ message: "Repair order not found" });
    }

    // Delete repair order (cascade will delete items)
    await repair.destroy();

    res.status(200).json({ message: "Repair order deleted successfully" });
  } catch (error) {
    logger.error(`Error in deleteRepair: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getRepairs,
  getRepairById,
  createRepair,
  updateRepairStatus,
  updateRepair,
  deleteRepair,
};
