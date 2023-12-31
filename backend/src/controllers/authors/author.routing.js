const postActions = require("./post.actions");
const getActions = require("./get.actions");
const putActions = require("./put.actions")

module.exports = {
  "/": {
    post: {
      action: postActions.addAuthors,
    },
  },
  "/main-page": {
    get: {
      action: getActions.getMainPafeAuthors,
    },
  },
  "/update-info":{
    put:{
      action:putActions.updateAuthors
    }
  },
  "/by-id/:id":{
    get:{
      action:getActions.getAuthorById
    }
  },
  "/get-authors":{
    get:{
      action:getActions.getAuthors
    }
  },
};
