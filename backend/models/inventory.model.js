const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");

const Inventory = sequelize.define(
  "Inventory",
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
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    lowStockAlert: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    supplier: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    sku: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    tableName: "inventory",
  },
);

module.exports = Inventory;
