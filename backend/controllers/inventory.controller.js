const { Inventory } = require("../models");
const { logger } = require("../utils/logger");
const { Op } = require("sequelize");

/**
 * Get all inventory items
 * @route GET /api/inventory
 * @access Private
 */
const getInventory = async (req, res) => {
  try {
    const { search, category, lowStock, limit = 10, offset = 0 } = req.query;

    // Build query options
    const options = {
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["name", "ASC"]],
    };

    // Build where clause
    const where = {};

    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }

    if (category) {
      where.category = category;
    }

    if (lowStock === "true") {
      where.quantity = { [Op.lte]: sequelize.col("lowStockAlert") };
    }

    if (Object.keys(where).length > 0) {
      options.where = where;
    }

    // Get inventory with pagination
    const { count, rows } = await Inventory.findAndCountAll(options);

    res.status(200).json({
      total: count,
      inventory: rows,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (error) {
    logger.error(`Error in getInventory: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get inventory item by ID
 * @route GET /api/inventory/:id
 * @access Private
 */
const getInventoryById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find inventory item by ID
    const item = await Inventory.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    logger.error(`Error in getInventoryById: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Create a new inventory item
 * @route POST /api/inventory
 * @access Private
 */
const createInventory = async (req, res) => {
  try {
    const {
      name,
      category,
      quantity,
      lowStockAlert,
      price,
      cost,
      supplier,
      location,
      sku,
      description,
    } = req.body;

    // Create new inventory item
    const item = await Inventory.create({
      name,
      category,
      quantity: quantity || 0,
      lowStockAlert: lowStockAlert || 5,
      price,
      cost,
      supplier,
      location,
      sku,
      description,
    });

    res.status(201).json(item);
  } catch (error) {
    logger.error(`Error in createInventory: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Update inventory item
 * @route PUT /api/inventory/:id
 * @access Private
 */
const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      category,
      quantity,
      lowStockAlert,
      price,
      cost,
      supplier,
      location,
      sku,
      description,
    } = req.body;

    // Find inventory item by ID
    const item = await Inventory.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    // Update inventory item
    await item.update({
      name,
      category,
      quantity,
      lowStockAlert,
      price,
      cost,
      supplier,
      location,
      sku,
      description,
    });

    res.status(200).json(item);
  } catch (error) {
    logger.error(`Error in updateInventory: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Update inventory quantity
 * @route PATCH /api/inventory/:id/quantity
 * @access Private
 */
const updateQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, adjustment } = req.body;

    // Find inventory item by ID
    const item = await Inventory.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    let newQuantity;

    // If adjustment is provided, add/subtract from current quantity
    if (adjustment !== undefined) {
      newQuantity = item.quantity + parseInt(adjustment);
    } else if (quantity !== undefined) {
      // Otherwise set to the provided quantity
      newQuantity = parseInt(quantity);
    } else {
      return res
        .status(400)
        .json({ message: "Either quantity or adjustment must be provided" });
    }

    // Ensure quantity is not negative
    if (newQuantity < 0) {
      newQuantity = 0;
    }

    // Update quantity
    await item.update({ quantity: newQuantity });

    res.status(200).json(item);
  } catch (error) {
    logger.error(`Error in updateQuantity: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Delete inventory item
 * @route DELETE /api/inventory/:id
 * @access Private
 */
const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;

    // Find inventory item by ID
    const item = await Inventory.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    // Delete inventory item
    await item.destroy();

    res.status(200).json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    logger.error(`Error in deleteInventory: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  updateQuantity,
  deleteInventory,
};
