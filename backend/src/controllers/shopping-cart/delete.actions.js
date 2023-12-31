const models = require("../../models");
const shopCart = models.shoppingCart;

async function deleteFromShopCartPerUesr(req, res) {
  const userUuid = req.params.uuid;
  const  {bookId}  = req.body;


  try {
    const item = await shopCart.findOne({
      where: {
        userUuid: userUuid,
        bookId: bookId,
      },
    });

    if (!item) {
      return res.status(404).send("Item not found in shopping cart");
    }

    await item.destroy();
    res.status(200).send("Item removed from shopping cart");
  } catch (error) {
    console.error("Error in deleteFromShopCartPerUser:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  deleteFromShopCartPerUesr,
};
