const { WorkshopOperation } = require("../models");
const { logger } = require("../utils/logger");

/**
 * Get all workshop operations
 * @route GET /api/workshop/operations
 * @access Private
 */
const getOperations = async (req, res) => {
  try {
    const { active, limit = 100, offset = 0 } = req.query;

    // Build query options
    const options = {
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["name", "ASC"]],
    };

    // Filter by active status if provided
    if (active !== undefined) {
      options.where = { active: active === "true" };
    }

    // Get operations with pagination
    const { count, rows } = await WorkshopOperation.findAndCountAll(options);

    res.status(200).json({
      total: count,
      operations: rows,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (error) {
    logger.error(`Error in getOperations: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get workshop operation by ID
 * @route GET /api/workshop/operations/:id
 * @access Private
 */
const getOperationById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find operation by ID
    const operation = await WorkshopOperation.findByPk(id);

    if (!operation) {
      return res.status(404).json({ message: "Operation not found" });
    }

    res.status(200).json(operation);
  } catch (error) {
    logger.error(`Error in getOperationById: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Create a new workshop operation
 * @route POST /api/workshop/operations
 * @access Private
 */
const createOperation = async (req, res) => {
  try {
    const { name, estimatedTime, estimatedMinutes, cost, margin, description } =
      req.body;

    // Create new operation
    const operation = await WorkshopOperation.create({
      name,
      estimatedTime,
      estimatedMinutes,
      cost,
      margin,
      description,
      // finalPrice is calculated in the model hook
    });

    res.status(201).json(operation);
  } catch (error) {
    logger.error(`Error in createOperation: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Update workshop operation
 * @route PUT /api/workshop/operations/:id
 * @access Private
 */
const updateOperation = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      estimatedTime,
      estimatedMinutes,
      cost,
      margin,
      description,
      active,
    } = req.body;

    // Find operation by ID
    const operation = await WorkshopOperation.findByPk(id);

    if (!operation) {
      return res.status(404).json({ message: "Operation not found" });
    }

    // Update operation
    await operation.update({
      name,
      estimatedTime,
      estimatedMinutes,
      cost,
      margin,
      description,
      active,
      // finalPrice is calculated in the model hook
    });

    res.status(200).json(operation);
  } catch (error) {
    logger.error(`Error in updateOperation: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Delete workshop operation
 * @route DELETE /api/workshop/operations/:id
 * @access Private
 */
const deleteOperation = async (req, res) => {
  try {
    const { id } = req.params;

    // Find operation by ID
    const operation = await WorkshopOperation.findByPk(id);

    if (!operation) {
      return res.status(404).json({ message: "Operation not found" });
    }

    // Delete operation
    await operation.destroy();

    res.status(200).json({ message: "Operation deleted successfully" });
  } catch (error) {
    logger.error(`Error in deleteOperation: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getOperations,
  getOperationById,
  createOperation,
  updateOperation,
  deleteOperation,
};
