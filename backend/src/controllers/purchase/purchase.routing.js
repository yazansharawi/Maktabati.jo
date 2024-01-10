const getActions = require("./get.actions");
const postActions = require("./post.actions");

module.exports = {
  "/create-new-purchase-by-user-uuid/:uuid": {
    post: {
      action: postActions.addPurchaseByUserUuid,
    },
  },
  "/get-book-store-orders-by-store-uuid/:uuid":{
    get:{
      action: getActions.getStoreOrdersByStoreUuid,
    }
  },
  "/get-book-store-recent-orders-by-uuid/:uuid": {
    get: {
      action: getActions.getStoreRecentOrders,
    },
  },
};
