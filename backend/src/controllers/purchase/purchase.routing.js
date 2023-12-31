const getActions = require("./get.actions");
const postActions = require("./post.actions");

module.exports = {
  "/create-new-purchase-by-user-uuid/:uuid": {
    post: {
      action: postActions.addPurchaseByUserUuid,
    },
  },
};
