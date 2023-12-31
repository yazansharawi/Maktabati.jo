const models = require("../../models");
const rentedBooks = models.rentedBooks;

async function deleteBookById(req, res) {
  const bookId = req.params.id;
  console.log("bookId",bookId)
  try {
    const book = await rentedBooks.findOne({ where: { bookId: bookId } });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    await rentedBooks.destroy({ where: { bookId: bookId } });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  deleteBookById,
};
