const { Notification, Customer, RepairOrder } = require("../models");
const { logger } = require("../utils/logger");
const { sendEmail } = require("../services/email.service");
const { sendWhatsApp } = require("../services/whatsapp.service");

/**
 * Send email notification
 * @route POST /api/notifications/email
 * @access Private
 */
const sendEmailNotification = async (req, res) => {
  try {
    const { customerId, repairOrderId, subject, message } = req.body;

    // Check if customer exists
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check if customer has email
    if (!customer.email) {
      return res
        .status(400)
        .json({ message: "Customer does not have an email address" });
    }

    // Check if repair order exists if provided
    if (repairOrderId) {
      const repairOrder = await RepairOrder.findByPk(repairOrderId);

      if (!repairOrder) {
        return res.status(404).json({ message: "Repair order not found" });
      }
    }

    // Create notification record
    const notification = await Notification.create({
      customerId,
      repairOrderId,
      type: "email",
      message,
      status: "pending",
    });

    // Send email
    try {
      await sendEmail({
        to: customer.email,
        subject,
        text: message,
        html: `<div>${message.replace(/\n/g, "<br>")}</div>`,
      });

      // Update notification status
      await notification.update({
        status: "sent",
        sentAt: new Date(),
      });

      // Update repair order if provided
      if (repairOrderId) {
        await RepairOrder.update(
          { customerNotified: true },
          { where: { id: repairOrderId } },
        );
      }

      res.status(200).json({
        message: "Email notification sent successfully",
        notification,
      });
    } catch (error) {
      // Update notification with error
      await notification.update({
        status: "failed",
        errorMessage: error.message,
      });

      logger.error(`Error sending email: ${error.message}`);
      res
        .status(500)
        .json({ message: "Failed to send email", error: error.message });
    }
  } catch (error) {
    logger.error(`Error in sendEmailNotification: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Send WhatsApp notification
 * @route POST /api/notifications/whatsapp
 * @access Private
 */
const sendWhatsAppNotification = async (req, res) => {
  try {
    const { customerId, repairOrderId, message } = req.body;

    // Check if customer exists
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check if customer has phone
    if (!customer.phone) {
      return res
        .status(400)
        .json({ message: "Customer does not have a phone number" });
    }

    // Check if repair order exists if provided
    if (repairOrderId) {
      const repairOrder = await RepairOrder.findByPk(repairOrderId);

      if (!repairOrder) {
        return res.status(404).json({ message: "Repair order not found" });
      }
    }

    // Create notification record
    const notification = await Notification.create({
      customerId,
      repairOrderId,
      type: "whatsapp",
      message,
      status: "pending",
    });

    // Send WhatsApp message
    try {
      await sendWhatsApp({
        to: customer.phone,
        message,
      });

      // Update notification status
      await notification.update({
        status: "sent",
        sentAt: new Date(),
      });

      // Update repair order if provided
      if (repairOrderId) {
        await RepairOrder.update(
          { customerNotified: true },
          { where: { id: repairOrderId } },
        );
      }

      res.status(200).json({
        message: "WhatsApp notification sent successfully",
        notification,
      });
    } catch (error) {
      // Update notification with error
      await notification.update({
        status: "failed",
        errorMessage: error.message,
      });

      logger.error(`Error sending WhatsApp message: ${error.message}`);
      res
        .status(500)
        .json({
          message: "Failed to send WhatsApp message",
          error: error.message,
        });
    }
  } catch (error) {
    logger.error(`Error in sendWhatsAppNotification: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get notifications
 * @route GET /api/notifications
 * @access Private
 */
const getNotifications = async (req, res) => {
  try {
    const { customerId, type, status, limit = 10, offset = 0 } = req.query;

    // Build query options
    const options = {
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
      include: [{ model: Customer }, { model: RepairOrder }],
    };

    // Build where clause
    const where = {};

    if (customerId) {
      where.customerId = customerId;
    }

    if (type) {
      where.type = type;
    }

    if (status) {
      where.status = status;
    }

    if (Object.keys(where).length > 0) {
      options.where = where;
    }

    // Get notifications with pagination
    const { count, rows } = await Notification.findAndCountAll(options);

    res.status(200).json({
      total: count,
      notifications: rows,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (error) {
    logger.error(`Error in getNotifications: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  sendEmailNotification,
  sendWhatsAppNotification,
  getNotifications,
};
