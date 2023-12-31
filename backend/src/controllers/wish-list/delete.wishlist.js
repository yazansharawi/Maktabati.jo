const models = require("../../models");
const wishList = models.wishList;

async function deleteBookFromWishList(req, res) {
  const userUuid = req.params.uuid;
  const { bookId } = req.body;


  try {
    const item = await wishList.findOne({
      where: {
        userUuid: userUuid,
        bookId: bookId,
      },
    });

    if (!item) {
      return res.status(404).send("Wishlist item not found");
    }

    await item.destroy();

    res.status(200).send("Item removed from wishlist");
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function deleteBookFromWishListById(req,res){
  const id = req.params.id;

  console.log("id",id)

  try {
    const item = await wishList.findOne({
      where: {
        bookId: id,
      },
    });


    if (!item) {
      return res.status(404).send("Wishlist item not found");
    }

    await item.destroy();

    res.status(200).send("Item removed from wishlist");
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  deleteBookFromWishList,
  deleteBookFromWishListById
};
