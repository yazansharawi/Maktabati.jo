const models = require("../../models");
const book = models.book;

async function updateBookById(req, res) {
  try {
    const bookId = req.params.id;
    const { title, genre, price, quantity } = req.body;

    const bookToUpdate = await book.findByPk(bookId);

    if (!bookToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    bookToUpdate.title = title;
    bookToUpdate.genre = genre;
    bookToUpdate.price = price;
    bookToUpdate.quantity = quantity;

    await bookToUpdate.save();

    res.json({
      success: true,
      message: "Book updated successfully",
      book: bookToUpdate,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update the book" });
  }
}

module.exports = {
  updateBookById,
};
