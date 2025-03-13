const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");

const WorkshopOperation = sequelize.define(
  "WorkshopOperation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estimatedTime: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Estimated time in format like "30 min", "1 hour"',
    },
    estimatedMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Estimated time in minutes for calculations",
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: "Base cost without margin",
    },
    margin: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 30.0,
      comment: "Profit margin percentage",
    },
    finalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: "Final price including margin",
    },
    description: {
      type: DataTypes.TEXT,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: "workshop_operations",
    hooks: {
      beforeValidate: (operation) => {
        // Calculate final price if cost and margin are provided
        if (operation.cost && operation.margin) {
          operation.finalPrice =
            parseFloat(operation.cost) *
            (1 + parseFloat(operation.margin) / 100);
          // Round to 2 decimal places
          operation.finalPrice = Math.round(operation.finalPrice * 100) / 100;
        }
      },
    },
  },
);

module.exports = WorkshopOperation;
