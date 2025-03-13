const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");
const Customer = require("./customer.model");
const RepairOrder = require("./repair-order.model");

const Invoice = sequelize.define(
  "Invoice",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
    paidAt: {
      type: DataTypes.DATE,
    },
    dueDate: {
      type: DataTypes.DATE,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    pdfPath: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    tableName: "invoices",
    hooks: {
      beforeValidate: (invoice) => {
        // Calculate total amount
        if (invoice.amount && invoice.tax) {
          invoice.totalAmount =
            parseFloat(invoice.amount) + parseFloat(invoice.tax);
          // Round to 2 decimal places
          invoice.totalAmount = Math.round(invoice.totalAmount * 100) / 100;
        }
      },
    },
  },
);

// Define associations
Invoice.belongsTo(Customer, {
  foreignKey: {
    name: "customerId",
    allowNull: false,
  },
});

Invoice.belongsTo(RepairOrder, {
  foreignKey: {
    name: "repairOrderId",
    allowNull: false,
  },
});

Customer.hasMany(Invoice, {
  foreignKey: "customerId",
});

RepairOrder.hasOne(Invoice, {
  foreignKey: "repairOrderId",
});

module.exports = Invoice;
