const models = require("../../models");
const bookStore = models.bookStore;
const book = models.book;
const purchase = models.purchase;
const { Op } = require("sequelize");
const moment = require("moment");

async function getStoreOrdersByStoreUuid(req, res) {
  try {
    const bookStoreUuid = req.params.uuid;

    const store = await bookStore.findOne({
      where: { bookStoreUuid: bookStoreUuid },
    });
    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: "Bookstore not found" });
    }

    const orders = await purchase.findAll({ where: { storeId: store.id } });

    res.json({ orders: orders });
  } catch (error) {
    console.error("Error fetching store orders:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve store orders" });
  }
}

async function getStoreRecentOrders(req, res) {
  try {
    const bookStoreUuid = req.params.uuid;
    const store = await bookStore.findOne({
      where: { bookStoreUuid: bookStoreUuid },
    });
    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: "Bookstore not found" });
    }

    const oneWeekAgo = moment().subtract(7, "days").toDate();

    const orders = await purchase.findAll({
      where: {
        storeId: store.id,
        orderStatus: "delivered",
        createdAt: { [Op.gte]: oneWeekAgo },
      },
      include: [
        {
          model: models.book, 
          required: true,
        },
      ],
    });

    res.json({ success: true, orders: orders });
  } catch (error) {
    console.error("Error fetching store recent orders:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to retrieve store recent orders",
      });
  }
}

module.exports = {
  getStoreOrdersByStoreUuid,
  getStoreRecentOrders,
};
