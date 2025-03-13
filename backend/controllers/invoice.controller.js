const { Invoice, Customer, RepairOrder, RepairOrderItem, WorkshopOperation } = require('../models');
const { logger } = require('../utils/logger');
const { generateInvoicePDF } = require('../services/pdf.service');
const { sendEmail } = require('../services/email.service');
const fs = require('fs');
const path = require('path');

/**
 * Generate invoice for repair order
 * @route POST /api/invoices/generate
 * @access Private
 */
const generateInvoice = async (req, res) => {
  try {
    const { repairOrderId, notes } = req.body;
    
    // Check if repair order exists
    const repairOrder = await RepairOrder.findByPk(repairOrderId, {
      include: [
        { model: Customer },
        { 
          model: RepairOrderItem, 
          as: 'items',
          include: [{ model: WorkshopOperation }]
        }
      ]
    });
    
    if (!repairOrder) {
      return res.status(404).json({ message: 'Repair order not found' });
    }
    
    // Check if repair is completed
    if (repairOrder.status !== 'completed') {
      return res.status(400).json({ message: 'Cannot generate invoice for incomplete repair' });
    }
    
    // Check if invoice already exists
    const existingInvoice = await Invoice.findOne({
      where: { repairOrderId }
    });
    
    if (existingInvoice) {
      return res.status(400).json({ message: 'Invoice already exists for this repair order' });
    }
    
    // Generate invoice number (format: INV-YYYYMMDD-XXXX)
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const invoiceNumber = `INV-${dateStr}-${randomNum}`;
    
    // Calculate tax (21% VAT for Spain)
    const taxRate = 0.21;
    const amount = parseFloat(repairOrder.totalPrice