const User = require("./user.model");
const Customer = require("./customer.model");
const Bicycle = require("./bicycle.model");
const WorkshopOperation = require("./workshop-operation.model");
const RepairOrder = require("./repair-order.model");
const RepairOrderItem = require("./repair-order-item.model");
const Inventory = require("./inventory.model");
const Notification = require("./notification.model");
const Invoice = require("./invoice.model");

// Export all models
module.exports = {
  User,
  Customer,
  Bicycle,
  WorkshopOperation,
  RepairOrder,
  RepairOrderItem,
  Inventory,
  Notification,
  Invoice,
};
