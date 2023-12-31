const postActions = require("./post.actions");
const getActions = require("./get.actions");
const deleteActions = require("./delete.actions");


module.exports = {
  "/add-to-shop-cart-by-user-uuid/:uuid": {
    post: {
      action: postActions.addToShopCart
    },
  },
  "/get-shop-cart-by-user-uuid/:uuid": {
    get: {
      action: getActions.getShopCartPerUesr
    },
  },
  "/delete-from-shop-cart-by-user-uuid/:uuid": {
    delete: {
      action: deleteActions.deleteFromShopCartPerUesr
    },
  },
};
