const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");
const Customer = require("./customer.model");

const Bicycle = sequelize.define(
  "Bicycle",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM(
        "mountain",
        "road",
        "electric",
        "hybrid",
        "urban",
        "gravel",
        "bmx",
        "children",
      ),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
    },
    serialNumber: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    tableName: "bicycles",
  },
);

// Define associations
Bicycle.belongsTo(Customer, {
  foreignKey: {
    name: "customerId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

Customer.hasMany(Bicycle, {
  foreignKey: "customerId",
});

module.exports = Bicycle;
