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
  "/user-recent-searches/:uuid": {
    put: {
      action: putActions.addUserLastFiveSearches,
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
  "/based-on-the-user-searches/:uuid": {
    get: {
      action: getActions.getUserlastSearches,
    },
  },
  "/by-uuid/:uuid": {
    get: {
      action: getActions.getUserByUuid,
    },
  },
  "/update-by-uuid/:uuid": {
    post: {
      action: postActions.updateUserInfoByUuid,
    },
  },
};
