const models = require("../../models");
const book = models.book;

async function deleteBookById(req, res) {
  try {
    const bookId = req.params.id;

    const bookToDelete = await book.findByPk(bookId);
    console.log("bookToDelete",bookToDelete)
    if (!bookToDelete) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    await bookToDelete.destroy();

    res.json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error in deleting book:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete the book" });
  }
}

module.exports = {
  deleteBookById,
};
