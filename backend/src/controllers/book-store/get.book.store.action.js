const models = require("../../models");
const bookStore = models.bookStore
module.exports.getBookStroeInfo = async (req, res) => {
    bookStore.findAll()
    .then((bookStore) => {
      return res.send(bookStore);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
};
