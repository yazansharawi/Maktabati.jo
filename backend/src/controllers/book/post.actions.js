const models = require("../../models");
const bookStore = models.bookStore;
const book = models.book;

async function createNewBooks(req, res) {
  try {
    return res.status(201).json(createdBooks);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

async function addBookByStoreUuid(req, res) {
  try {
    const bookStoreUuid = req.params.uuid;
    const { title, genre, price, quantity } = req.body;

    const store = await bookStore.findOne({
      where: { bookStoreUuid: bookStoreUuid },
    });

    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: "Bookstore not found" });
    }
    let image =
      "https://ucarecdn.com/64637378-2a07-4e0e-b0cf-861ef75ba1cf/51lGPzTSsUL.jpg";
    let publisher = "Sharawi";
    let publicationYear = "2019";
    let language = "english";
    let topicId = "1";
    let inThisBookId = "1";
    let authorId = "1";
    let bookCondition = "new";
    let targetedPeople = 'Adults'
    const newBook = await book.create({
      title,
      genre,
      price,
      quantity,
      storeId: store.id,
      image: image,
      publisher: publisher,
      publicationYear: publicationYear,
      language: language,
      topicId: topicId,
      inThisBookId: inThisBookId,
      authorId: authorId,
      bookCondition: bookCondition,
      targetedPeople:targetedPeople
    });

    res.json({
      success: true,
      message: "Book added successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("Error adding book to the bookstore:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add book to the bookstore" });
  }
}

module.exports = {
  createNewBooks,
  addBookByStoreUuid,
};
