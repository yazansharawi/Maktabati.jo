const getActions = require("./get.actions");
const postActions = require("./post.actions");
const deleteActions = require("./delete.actions")

module.exports = {
  "/rent-book-by-user-uuid/:uuid": {
    post: {
      action: postActions.addRentedBookToUser
    },
  },
  "/get-rented-books-per-user-by-uuid/:uuid": {
    get: {
      action: getActions.getBooksPeruserByUuid
    },
  },
  "/delete-book-by-id/:id": {
    delete: {
      action: deleteActions.deleteBookById
    },
  },
};
