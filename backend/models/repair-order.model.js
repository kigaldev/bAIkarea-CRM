const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");
const Customer = require("./customer.model");
const Bicycle = require("./bicycle.model");
const User = require("./user.model");

const RepairOrder = sequelize.define(
  "RepairOrder",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    issueDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "in_progress",
        "completed",
        "delivered",
        "cancelled",
      ),
      allowNull: false,
      defaultValue: "pending",
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      defaultValue: "medium",
    },
    estimatedCompletionDate: {
      type: DataTypes.DATE,
    },
    completedDate: {
      type: DataTypes.DATE,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    customerNotified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "repair_orders",
  },
);

// Define associations
RepairOrder.belongsTo(Customer, {
  foreignKey: {
    name: "customerId",
    allowNull: false,
  },
});

RepairOrder.belongsTo(Bicycle, {
  foreignKey: {
    name: "bicycleId",
    allowNull: false,
  },
});

RepairOrder.belongsTo(User, {
  foreignKey: {
    name: "assignedTechnicianId",
    allowNull: true,
  },
  as: "assignedTechnician",
});

Customer.hasMany(RepairOrder, {
  foreignKey: "customerId",
});

Bicycle.hasMany(RepairOrder, {
  foreignKey: "bicycleId",
});

User.hasMany(RepairOrder, {
  foreignKey: "assignedTechnicianId",
  as: "assignedRepairs",
});

module.exports = RepairOrder;
