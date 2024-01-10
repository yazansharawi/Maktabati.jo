const getActions = require("./get.actions");
const postActions = require("./post.actions");
const putActions = require('./put.actions')

module.exports = {
  "/create-store-by-user-uuid/:uuid": {
    post: {
      action: postActions.createStore,
    },
  },
  "/get-book-store-by-uuid/:uuid": {
    get: {
      action: getActions.getBookStoreByuuid,
    },
  },
  "/get-book-store-products-by-store-uuid/:uuid": {
    get: {
      action: getActions.getBookStoreProductsByUuid,
    },
  },
  "/update-book-store-data-by-store-uuid/:uuid": {
    put: {
      action: putActions.updateBookStoreData,
    },
  },
  "/get-book-store-setting-data-by-uuid/:uuid": {
    get: {
      action: getActions.getStoreSettingData,
    },
  },
  "/get-book-store-total-revenue-by-uuid/:uuid": {
    get: {
      action: getActions.getBookStoreTotalRevenue,
    },
  },
  "/get-book-store-rented-books-by-uuid/:uuid": {
    get: {
      action: getActions.getBookStoreRentedBooks,
    },
  },
  "/get-book-store-sold-books-by-uuid/:uuid": {
    get: {
      action: getActions.getBookStoreSoldBooks,
    },
  },
};
