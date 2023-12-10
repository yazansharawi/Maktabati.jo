const getActions = require("./get.actions");
const postActions = require("./post.actions");

module.exports = {
  "/": {
    post: {
      action: postActions.createNewBooks,
    },
    get:{
      action: getActions.getBooks
    }
  },
  "/by-genre/:genre": {
    get: {
      action: getActions.getBooksByGenre,
    },
  },
  "/by-id/:id": {
    get: {
      action: getActions.getBookById,
    },
  },
  "/best-sellers": {
    get: {
      action: getActions.getBestSellersBooks,
    },
  },
  "/has-offer": {
    get: {
      action: getActions.getBookWithOffer,
    },
  },
};
