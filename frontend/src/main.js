import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import vuetify from "./plugins/vuetify.js";
import { loadFonts } from "./plugins/webfontloader";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import router from "./router";
import store from "./store";
import {
  questions,
  bookTypeOptions,
  bookAgeOptions,
  images,
  countries,
} from "../src/constants.ts";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const app = createApp(App);

app.config.globalProperties.$questions = questions;
app.config.globalProperties.$bookTypeOptions = bookTypeOptions;
app.config.globalProperties.$bookAgeOptions = bookAgeOptions;
app.config.globalProperties.$images = images;
app.config.globalProperties.$countries = countries;
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$store = store;

async function getAllGenres() {
  try {
    const response = await axios.get("/book/get-Books-genre");
    app.config.globalProperties.$genreOptions = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function getAllAuthors() {
  try {
    const response = await axios.get("/authors/get-authors");
    app.config.globalProperties.$authorOptions = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function getWishListForUserByUuid() {
  try {
    const response = await axios.get(
      `wish-list/get-wishlist-by-uuid/${store.getters.user.uuid}`
    );
    app.config.globalProperties.$wishListPerUser = response.data.wishlistItems;
    app.config.globalProperties.$wishListPerUserBookInfo =
      response.data.booksInfo;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function getUserLastFiveSearches() {
  try {
    const response = await axios.get(
      `user/based-on-the-user-searches/${store.getters.user.uuid}`
    );
    app.config.globalProperties.$userLastFiveSearches = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function getBooksRentedPeruserByUuid() {
  try {
    const response = await axios.get(
      `rent-book/get-rented-books-per-user-by-uuid/${store.getters.user.uuid}`
    );
    app.config.globalProperties.$userRentedBooks = response.data.bookIds;
    app.config.globalProperties.$userRentedBooksInfo = response.data.booksInfo;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function getShoppingCartPerUserByUuid() {
  try {
    const response = await axios.get(
      `shopping-cart/get-shop-cart-by-user-uuid/${store.getters.user.uuid}`
    );
    app.config.globalProperties.$userShoppingCart = response.data.bookIds;
    app.config.globalProperties.$userShoppingCartInfo = response.data.booksInfo;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function getBookStoreTotalRevenue() {
  try {
    const response = await axios.get(
      `book-store/get-book-store-total-revenue-by-uuid/${store.getters.storeUuid}`
    );
    app.config.globalProperties.$bookStoreTotalRevenue =
      response.data.totalRevenue;
  } catch (e) {
    console.error("Error fetching data:", e);
    throw e;
  }
}

async function getBookRentedAtTheMomen() {
  try {
    const response = await axios.get(`book-store/get-book-store-rented-books-by-uuid/${store.getters.storeUuid}`)
    app.config.globalProperties.$bookStoreTotalRentedBooks =
    response.data.rentedBookCount;
  } catch (e) {
    console.error("Error fetching data:", e);
    throw e;
  }
}

async function getBookStoreSoldBooks(){
  try {
    const response = await axios.get(`book-store/get-book-store-sold-books-by-uuid/${store.getters.storeUuid}`)
    app.config.globalProperties.$bookStoreBookSoldLastMonth =
    response.data.soldBooks.length;
  } catch (e) {
    console.error("Error fetching data:", e);
    throw e;
  }
}

if (store.getters.user && store.getters.user.type === "regularUser") {
  console.log("Regular User");
  getWishListForUserByUuid();
  getUserLastFiveSearches();
  getBooksRentedPeruserByUuid();
  getShoppingCartPerUserByUuid();
} else if (store.getters.user && store.getters.user.type === "owner") {
  console.log("Owner");
  getBookStoreTotalRevenue();
  getBookRentedAtTheMomen();
  getBookStoreSoldBooks();
} else {
  console.log("No Store found");
}

app.use(router);
app.use(vuetify);
app.use(store);

app.mount("#app");
getAllGenres();
getAllAuthors();
loadFonts();
