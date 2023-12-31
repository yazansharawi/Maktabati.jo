const postActions = require("./post.wishlist");
const getActions = require("./get.wishlist");
const deleteActions = require("./delete.wishlist")

module.exports = {
  "/add-to-wishlist-by-uuid/:uuid": {
    post: {
      action: postActions.addToWishList,
    },
  },
  "/get-wishlist-by-uuid/:uuid": {
    get: {
      action: getActions.getWishList,
    },
  },
  "/delete-wishlist-by-user-uuid/:uuid": {
    delete: {
      action: deleteActions.deleteBookFromWishList,
    },
  },
  "/delete-wishlist-by-book-id/:id": {
    delete: {
      action: deleteActions.deleteBookFromWishListById,
    },
  },
};
