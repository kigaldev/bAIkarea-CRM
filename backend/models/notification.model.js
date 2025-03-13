const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");
const Customer = require("./customer.model");
const RepairOrder = require("./repair-order.model");

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM("email", "whatsapp", "sms"),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "sent", "failed"),
      allowNull: false,
      defaultValue: "pending",
    },
    errorMessage: {
      type: DataTypes.TEXT,
    },
    sentAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    tableName: "notifications",
  },
);

// Define associations
Notification.belongsTo(Customer, {
  foreignKey: {
    name: "customerId",
    allowNull: false,
  },
});

Notification.belongsTo(RepairOrder, {
  foreignKey: {
    name: "repairOrderId",
    allowNull: true,
  },
});

Customer.hasMany(Notification, {
  foreignKey: "customerId",
});

RepairOrder.hasMany(Notification, {
  foreignKey: "repairOrderId",
});

module.exports = Notification;
