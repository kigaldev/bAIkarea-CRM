const { Bicycle, Customer } = require("../models");
const { logger } = require("../utils/logger");

/**
 * Get all bicycles
 * @route GET /api/bicycles
 * @access Private
 */
const getBicycles = async (req, res) => {
  try {
    const { customerId, limit = 10, offset = 0 } = req.query;

    // Build query options
    const options = {
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
      include: [{ model: Customer }],
    };

    // Filter by customer if provided
    if (customerId) {
      options.where = { customerId };
    }

    // Get bicycles with pagination
    const { count, rows } = await Bicycle.findAndCountAll(options);

    res.status(200).json({
      total: count,
      bicycles: rows,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (error) {
    logger.error(`Error in getBicycles: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get bicycle by ID
 * @route GET /api/bicycles/:id
 * @access Private
 */
const getBicycleById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find bicycle by ID
    const bicycle = await Bicycle.findByPk(id, {
      include: [{ model: Customer }],
    });

    if (!bicycle) {
      return res.status(404).json({ message: "Bicycle not found" });
    }

    res.status(200).json(bicycle);
  } catch (error) {
    logger.error(`Error in getBicycleById: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Create a new bicycle
 * @route POST /api/bicycles
 * @access Private
 */
const createBicycle = async (req, res) => {
  try {
    const { customerId, brand, model, type, color, serialNumber, notes } =
      req.body;

    // Check if customer exists
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Create new bicycle
    const bicycle = await Bicycle.create({
      customerId,
      brand,
      model,
      type,
      color,
      serialNumber,
      notes,
    });

    // Get bicycle with customer data
    const bicycleWithCustomer = await Bicycle.findByPk(bicycle.id, {
      include: [{ model: Customer }],
    });

    res.status(201).json(bicycleWithCustomer);
  } catch (error) {
    logger.error(`Error in createBicycle: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Update bicycle
 * @route PUT /api/bicycles/:id
 * @access Private
 */
const updateBicycle = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId, brand, model, type, color, serialNumber, notes } =
      req.body;

    // Find bicycle by ID
    const bicycle = await Bicycle.findByPk(id);

    if (!bicycle) {
      return res.status(404).json({ message: "Bicycle not found" });
    }

    // Check if customer exists if customerId is provided
    if (customerId) {
      const customer = await Customer.findByPk(customerId);

      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
    }

    // Update bicycle
    await bicycle.update({
      customerId: customerId || bicycle.customerId,
      brand,
      model,
      type,
      color,
      serialNumber,
      notes,
    });

    // Get updated bicycle with customer data
    const updatedBicycle = await Bicycle.findByPk(bicycle.id, {
      include: [{ model: Customer }],
    });

    res.status(200).json(updatedBicycle);
  } catch (error) {
    logger.error(`Error in updateBicycle: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Delete bicycle
 * @route DELETE /api/bicycles/:id
 * @access Private
 */
const deleteBicycle = async (req, res) => {
  try {
    const { id } = req.params;

    // Find bicycle by ID
    const bicycle = await Bicycle.findByPk(id);

    if (!bicycle) {
      return res.status(404).json({ message: "Bicycle not found" });
    }

    // Delete bicycle
    await bicycle.destroy();

    res.status(200).json({ message: "Bicycle deleted successfully" });
  } catch (error) {
    logger.error(`Error in deleteBicycle: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getBicycles,
  getBicycleById,
  createBicycle,
  updateBicycle,
  deleteBicycle,
};
