const models = require("../../models");
const book = models.book
async function getBooksByGenre(req, res){

  console.log("req",req.params.genre)
  book.findAll({
    where: {
      genre: req.params.genre
  },
  })
    .then((Book) => {
      return res.send(Book);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
};


module.exports = {
  getBooksByGenre
}
