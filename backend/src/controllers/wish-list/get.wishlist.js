const models = require("../../models");
const wishList = models.wishList;
const Book = models.book;
const author = models.author;

async function getWishList(req, res) {
  const userUuid = req.params.uuid;
  try {
    const wishlistItems = await wishList.findAll({
      where: { userUuid: userUuid },
      attributes: ["id", "bookId"],
    });

    const booksInfo = await Promise.all(
      wishlistItems.map(async (item) => {
        const book = await Book.findOne({
          include: [
            {
              model: author,
              attributes: ["name"],
            },
          ],
          where: { id: item.bookId },
          attributes: ["title", "image","id"],
        });
        return book ? book.get({ plain: true }) : null;
      })
    );

    res.status(200).json({ wishlistItems, booksInfo });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getWishList,
};
