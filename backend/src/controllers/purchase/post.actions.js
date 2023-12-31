const models = require("../../models");
const Purchase = models.purchase;
const Book = models.book;

async function addPurchaseByUserUuid(req, res) {
  const userUuid = req.params.uuid;
  const { bookIds, storeIds, userAddress, paymentMethod } = req.body;

  console.log("brooooooo");

  let orderId = 1;
  let paymentId = 1;

  let lastPurchase = null;
  try {
    const lastPurchase = await Purchase.findOne({
      order: [["createdAt", "DESC"]],
    });

    if (lastPurchase) {
      orderId = lastPurchase.orderId + 1;
      paymentId = lastPurchase.paymentId + 1;
    }
  } catch (error) {
    console.error("Error in retrieving the last purchase record:", error);
    res.status(500).send("Internal Server Error");
  }

  try {
    const books = await Promise.all(
      bookIds.map((bookId) => {
        return Book.findByPk(bookId, {
          attributes: ["price"],
        });
      })
    );

    const purchases = await Promise.all(
      books.map((book, index) => {
        const storeId = storeIds[index];
        const bookPrice = book ? book.price : 0;

        return Purchase.create({
          storeId: storeId,
          userUuid: userUuid,
          bookId: bookIds[index],
          shippingAddress: userAddress,
          paymentAmount: bookPrice,
          paymentMethod: paymentMethod,
          paymentStatus: "pending",
          orderStatus: "preparing",
          orderId: orderId,
          paymentId: paymentId,
        });
      })
    );

    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error adding purchases:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  addPurchaseByUserUuid,
};
