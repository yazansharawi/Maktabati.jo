const getActions = require("./get.users.action");
const postActions = require("./post.users.action");

module.exports = {
  "/": {
    get: {
      action: getActions.getUsers,
    },
    post: {
      action: postActions.createUser,
    },
  },
  "/login": {
    post: {
      action: postActions.loginUser,
    },
  },
};
