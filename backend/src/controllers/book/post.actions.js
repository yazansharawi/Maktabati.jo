const models = require("../../models");
const Book = models.book; 

async function createNewBooks(req, res) {
  try {
    return res.status(201).json(createdBooks);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  createNewBooks,
};
