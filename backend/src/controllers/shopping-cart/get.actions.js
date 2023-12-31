const models = require("../../models");
const shopCart = models.shoppingCart;
const Book = models.book;
const author = models.author;

async function getShopCartPerUesr(req, res) {
  const userUuid = req.params.uuid;

  try {
    const shopCartRecords = await shopCart.findAll({
      where: { userUuid: userUuid },
      attributes: ["bookId"],
    });

    const bookIds = shopCartRecords.map((record) => record.bookId);

    const booksInfo = await Promise.all(
      shopCartRecords.map(async (item) => {
        const book = await Book.findOne({
          include: [
            {
              model: author,
              attributes: ["name"],
            },
          ],
          where: { id: item.bookId },
          attributes: ["title", "image", "id", "price", "genre","storeId"],
        });
        return book ? book.get({ plain: true }) : null;
      })
    );

    res.status(200).json({ bookIds, booksInfo });
  } catch (error) {
    console.error("Error fetching rented books for user:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getShopCartPerUesr,
};
