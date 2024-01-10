const getActions = require("./get.actions");
const postActions = require("./post.actions");
const deleteActions = require("./delete.action");
const putActions = require("./put.actions");

module.exports = {
  "/": {
    post: {
      action: postActions.createNewBooks,
    },
    get: {
      action: getActions.getBooks,
    },
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
  "/get-Books-genre": {
    get: {
      action: getActions.getAllGenres,
    },
  },
  "/get-Books-by-name/:bookName": {
    get: {
      action: getActions.getBookByName,
    },
  },
  "/add-book-by-store-uuid/:uuid": {
    post: {
      action: postActions.addBookByStoreUuid,
    },
  },
  "/delete-by-book-id/:id": {
    delete: {
      action: deleteActions.deleteBookById,
    },
  },
  "/update-by-book-id/:id": {
    put: {
      action: putActions.updateBookById,
    },
  },
};
