const models = require("../../models");
const shopCart = models.shoppingCart;
const Book = models.book;
const author = models.author;

async function addToShopCart(req, res) {
  const userUuid = req.params.uuid;
  const { bookId, storeId } = req.body;

  try {
    const newCartItem = await shopCart.create({
      userUuid,
      bookId,
      storeId,
    });

    res.status(200).json(newCartItem);
  } catch (error) {
    console.error("Error adding to shopping cart:", error);
    res.status(500).send("Internal Server Error");
  }
}


module.exports = {
  addToShopCart,
};
