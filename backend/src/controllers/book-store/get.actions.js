const models = require("../../models");
const bookStore = models.bookStore;
const book = models.book;
const purchase = models.purchase;
const rentedBooks = models.rentedBooks;
const moment = require("moment");
const { Sequelize, Op } = require("sequelize");

async function getBookStoreByuuid(req, res) {
  try {
    const ownerUuid = req.params.uuid;
    const bookstore = await BookStore.findOne({ where: { ownerUuid } });

    console.log("ownerUuid", ownerUuid);
    console.log("bookstore", bookstore);

    return;

    if (bookstore) {
      res.json({ success: true, bookstore });
    } else {
      res.status(404).json({ success: false, message: "Bookstore not found" });
    }
  } catch (error) {
    console.error("Error getting bookstore:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve bookstore" });
  }
}

async function getBookStoreProductsByUuid(req, res) {
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

    const books = await book.findAll({ where: { storeId: store.id } });

    if (books && books.length > 0) {
      res.json({ success: true, books: books });
    } else {
      res.json({
        success: false,
        message: "No products found for this bookstore",
      });
    }
  } catch (error) {
    console.error("Error fetching bookstore products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve bookstore products",
    });
  }
}

async function getStoreSettingData(req, res) {
  try {
    const bookStoreUuid = req.params.uuid;

    const store = await bookStore.findOne({
      where: { bookStoreUuid: bookStoreUuid },
      attributes: ["name", "email", "address", "shopNumber"],
    });

    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: "Bookstore not found" });
    }

    res.json({ success: true, data: store });
  } catch (error) {
    console.error("Error fetching bookstore settings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve bookstore settings",
    });
  }
}

async function getBookStoreTotalRevenue(req, res) {
  try {
    const bookStoreUuid = req.params.uuid;

    const store = await bookStore.findOne({ where: { bookStoreUuid } });
    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: "Bookstore not found" });
    }

    const sales = await purchase.sum("paymentAmount", {
      where: { storeId: store.id },
    });

    const rentals = await rentedBooks.findAll({
      where: { storeId: store.id },
    });

    let rentalRevenue = 0;
    rentals.forEach((rental) => {
      const duration = moment(rental.endDate).diff(
        moment(rental.startDate),
        "weeks",
        true
      );
      rentalRevenue += duration > 1 ? 20 : 10;
    });

    const totalRevenue = sales + rentalRevenue;

    res.json({ success: true, totalRevenue: totalRevenue });
  } catch (error) {
    console.error("Error calculating total revenue:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to calculate total revenue" });
  }
}

async function getBookStoreRentedBooks(req, res) {
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

    const count = await rentedBooks.count({
      where: {
        storeId: store.id,
        endDate: { [Sequelize.Op.gte]: new Date() },
      },
    });

    res.json({ success: true, rentedBookCount: count });
  } catch (error) {
    console.error("Error fetching rented book count:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch rented book count" });
  }
}

async function getBookStoreSoldBooks(req, res) {
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

    const oneMonthAgo = moment().subtract(1, "months").toDate();

    const soldBooks = await purchase.findAll({
      where: {
        storeId: store.id,
        paymentStatus: "sold",
        updatedAt: {
          [Op.gte]: oneMonthAgo,
        },
      },
    });

    res.json({soldBooks: soldBooks });
  } catch (error) {
    console.error("Error fetching sold books:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch sold books" });
  }
}

module.exports = {
  getBookStoreByuuid,
  getBookStoreProductsByUuid,
  getStoreSettingData,
  getBookStoreTotalRevenue,
  getBookStoreRentedBooks,
  getBookStoreSoldBooks,
};
