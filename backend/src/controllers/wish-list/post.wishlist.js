const models = require("../../models");
const User = models.User;
const wishList = models.wishList;

async function addToWishList(req, res) {
  try {
    const userUuid = req.params.uuid;
    const { bookId } = req.body; 

    const newWishListEntry = await wishList.create({
      userUuid: userUuid,
      bookId: bookId,
    });

    res.status(200).json(newWishListEntry);
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  addToWishList,
};
