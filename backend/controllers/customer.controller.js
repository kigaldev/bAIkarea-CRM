const fs = require("fs");
const csv = require("csv-parser");
const { Customer, Bicycle } = require("../models");
const { logger } = require("../utils/logger");
const { Op } = require("sequelize");

/**
 * Get all customers
 * @route GET /api/customers
 * @access Private
 */
const getCustomers = async (req, res) => {
  try {
    const { search, limit = 10, offset = 0 } = req.query;

    // Build query options
    const options = {
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    };

    // Add search condition if provided
    if (search) {
      options.where = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { phone: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
        ],
      };
    }

    // Get customers with pagination
    const { count, rows } = await Customer.findAndCountAll(options);

    res.status(200).json({
      total: count,
      customers: rows,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (error) {
    logger.error(`Error in getCustomers: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get customer by ID
 * @route GET /api/customers/:id
 * @access Private
 */
const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find customer by ID
    const customer = await Customer.findByPk(id, {
      include: [{ model: Bicycle }],
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    logger.error(`Error in getCustomerById: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Create a new customer
 * @route POST /api/customers
 * @access Private
 */
const createCustomer = async (req, res) => {
  try {
    const { name, phone, email, address, notes } = req.body;

    // Check if customer with phone already exists
    const customerExists = await Customer.findOne({ where: { phone } });

    if (customerExists) {
      return res
        .status(400)
        .json({ message: "Customer with this phone number already exists" });
    }

    // Create new customer
    const customer = await Customer.create({
      name,
      phone,
      email,
      address,
      notes,
    });

    res.status(201).json(customer);
  } catch (error) {
    logger.error(`Error in createCustomer: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Update customer
 * @route PUT /api/customers/:id
 * @access Private
 */
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, address, notes } = req.body;

    // Find customer by ID
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check if phone number is being changed and already exists
    if (phone !== customer.phone) {
      const phoneExists = await Customer.findOne({ where: { phone } });

      if (phoneExists) {
        return res
          .status(400)
          .json({ message: "Phone number already in use by another customer" });
      }
    }

    // Update customer
    await customer.update({
      name,
      phone,
      email,
      address,
      notes,
    });

    res.status(200).json(customer);
  } catch (error) {
    logger.error(`Error in updateCustomer: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Delete customer
 * @route DELETE /api/customers/:id
 * @access Private
 */
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    // Find customer by ID
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Delete customer
    await customer.destroy();

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    logger.error(`Error in deleteCustomer: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Import customers from CSV
 * @route POST /api/customers/import
 * @access Private
 */
const importCustomers = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a CSV file" });
    }

    const results = [];
    const errors = [];
    let imported = 0;

    // Parse CSV file
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        // Process each row
        for (const row of results) {
          try {
            // Check required fields
            if (!row.name || !row.phone) {
              errors.push({ row, error: "Name and phone are required" });
              continue;
            }

            // Check if customer already exists
            const customerExists = await Customer.findOne({
              where: { phone: row.phone },
            });

            if (customerExists) {
              errors.push({
                row,
                error: "Customer with this phone number already exists",
              });
              continue;
            }

            // Create customer
            await Customer.create({
              name: row.name,
              phone: row.phone,
              email: row.email || null,
              address: row.address || null,
              notes: row.notes || null,
            });

            imported++;
          } catch (error) {
            errors.push({ row, error: error.message });
          }
        }

        // Delete temporary file
        fs.unlinkSync(req.file.path);

        res.status(200).json({
          message: `Imported ${imported} customers successfully`,
          imported,
          errors,
        });
      });
  } catch (error) {
    logger.error(`Error in importCustomers: ${error.message}`);

    // Delete temporary file if it exists
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  importCustomers,
};
