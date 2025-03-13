const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");
const RepairOrder = require("./repair-order.model");
const WorkshopOperation = require("./workshop-operation.model");

const RepairOrderItem = sequelize.define(
  "RepairOrderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customDescription: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "repair_order_items",
    hooks: {
      beforeValidate: (item) => {
        // Calculate total price
        if (item.price && item.quantity) {
          item.totalPrice = parseFloat(item.price) * parseInt(item.quantity);
          // Round to 2 decimal places
          item.totalPrice = Math.round(item.totalPrice * 100) / 100;
        }
      },
    },
  },
);

// Define associations
RepairOrderItem.belongsTo(RepairOrder, {
  foreignKey: {
    name: "repairOrderId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

RepairOrderItem.belongsTo(WorkshopOperation, {
  foreignKey: {
    name: "operationId",
    allowNull: true,
  },
});

RepairOrder.hasMany(RepairOrderItem, {
  foreignKey: "repairOrderId",
  as: "items",
});

WorkshopOperation.hasMany(RepairOrderItem, {
  foreignKey: "operationId",
});

module.exports = RepairOrderItem;
