const getActions = require("./get.users.action");
const postActions = require("./post.users.action");
const putActions = require("./put.users.action");

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
  "/by-id/:id": {
    get: {
      action: getActions.getUserById,
    },
  },
  "/verify-otp/:uuid": {
    post: {
      action: postActions.verifyOtpUserByUuid,
    },
  },
  "/user-preferences/:uuid": {
    put: {
      action: putActions.addUserPreferences,
    },
  },
  "/forget-password": {
    post: {
      action: postActions.userForgetPassword,
    },
  },
  "/reset-password": {
    post: {
      action: postActions.resetPassword,
    },
  },
};
