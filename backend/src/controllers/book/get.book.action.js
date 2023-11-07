const models = require("../../models");
const book = models.book
module.exports.getBooks = async (req, res) => {
  book.findAll()
    .then((Book) => {
      return res.send(Book);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
};
