const models = require("../../models");
const rentedBooks = models.rentedBooks;
const Book = models.book;
const author = models.author;

async function getBooksPeruserByUuid(req, res) {
  const userUuid = req.params.uuid;

  try {
    const rentedBooksRecords = await rentedBooks.findAll({
      where: { userUuid: userUuid },
      attributes: ["bookId"],
    });

    const bookIds = rentedBooksRecords.map((record) => record.bookId);

    const booksInfo = await Book.findAll({
      include: [
        {
          model: author,
          attributes: ["name"],
        },
      ],
      where: {
        id: bookIds,
      },
      attributes: ["title", "image", "genre", "language", "price","id"],
    });

    res.status(200).json({ bookIds, booksInfo });
  } catch (error) {
    console.error("Error fetching rented books for user:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getBooksPeruserByUuid,
};
