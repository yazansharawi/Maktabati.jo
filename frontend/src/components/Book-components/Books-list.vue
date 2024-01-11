<template>
  <div>
    <div :style="{ backgroundColor: backgroundColor }" class="main-container">
      <div class="headers-container">
        <div class="list-header">{{ sectionName }}</div>
        <router-link
          class="see-all-header"
          :to="{ name: 'ShopPage' }"
          style="text-decoration: none; color: inherit"
          >See all</router-link
        >
      </div>
      <div class="books-scroll-container">
        <div class="books-container">
          <div
            v-for="(book, index) in books"
            :key="index"
            :style="style(isOffer)"
          >
            <router-link
              :to="{
                name: 'BookOverView',
                params: { id: book.id },
                query: { isHomePage: isHomePage.toString() },
              }"
              style="text-decoration: none; color: inherit"
            >
              <div class="book-cover-container">
                <div v-if="isOffer" class="discount-offer" style="width: 210px">
                  15% off
                </div>
                <img
                  :src="book.image"
                  alt="Book Image"
                  style="width: 210px; height: 300px; max-height: 400px"
                />
              </div>
            </router-link>
            <div
              style="
                display: flex;
                display: flex;
                flex-direction: column;
                gap: 5px;
              "
            >
              <div class="book-name-container">
                <div class="text-truncate" style="max-width: 100px">
                  {{ book.title }}
                </div>
                <div>${{ book.price }}</div>
              </div>
              <div class="book-author-container text-truncate">
                By: {{ book.author.name ? book.author.name : "Unknown Author" }}
              </div>
              <div>
                <v-rating
                  half-increments
                  readonly
                  :length="5"
                  :size="28"
                  :model-value="book.bookRating"
                  color="warning"
                  active-color="warning"
                />
              </div>
              <div style="padding-top: 5px">
                <v-btn
                  prepend-icon="mdi-bag-personal"
                  elevation="0"
                  class="add-btn"
                  @click="handleWishList(book.id)"
                >
                  {{ wishListStatus[book.id] ? "added" : "add to WishList" }}
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookList",
  components: {},
  mounted() {
    this.processWishListData();
  },
  computed: {
    style() {
      return function (status) {
        if (status) {
          return {
            paddingRight: "55px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          };
        } else {
          return {
            paddingRight: "55px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          };
        }
      };
    },
  },
  props: {
    backgroundColor: {
      type: String,
      required: false,
      default: "red",
    },
    sectionName: {
      type: String,
      required: false,
      default: null,
    },
    isOffer: {
      type: Boolean,
      required: false,
      default: false,
    },
    books: {
      type: Array,
      required: false,
      default: () => [],
    },
    isHomePage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      wishList: {},
      wishListStatus: {},
    };
  },
  methods: {
    waitForWishListData() {
      return new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    },
    async processWishListData() {
      if (Array.isArray(this.$wishListPerUser)) {
        this.$wishListPerUser.forEach((item) => {
          this.wishListStatus[item.bookId] = !item.deletedAt;
        });
      } else {
        console.log("Waiting for wishlist data to be loaded");
        await this.waitForWishListData();
        this.processWishListData();
      }
    },
    handleWishList(bookId) {
      if (this.wishListStatus[bookId]) {
        this.removeFromWishList(bookId);
      } else {
        this.addToWishList(bookId);
      }
    },
    addToWishList(bookId) {
      this.$axios
        .post(
          `wish-list/add-to-wishlist-by-uuid/${this.$store.getters.user.uuid}`,
          { bookId }
        )
        .then(() => {
          this.wishListStatus = { ...this.wishListStatus, [bookId]: true };
        })
        .catch((error) => {
          console.error("Error adding to wishlist:", error);
        });
    },
    removeFromWishList(bookId) {
      this.$axios
        .put(
          `wish-list/delete-wishlist-by-user-uuid/${this.$store.getters.user.uuid}`,
          { bookId }
        )
        .then(() => {
          this.wishListStatus = { ...this.wishListStatus, [bookId]: false };
        })
        .catch((error) => {
          console.error("Error removing from wishlist:", error);
        });
    },
  },
};
</script>

<style scoped>
.main-container {
  height: 570px;
  background-color: white;
}
.headers-container {
  padding-top: 25px;
  padding-bottom: 10px;
  padding-left: 13px;
  padding-right: 25px;
  display: flex;
  justify-content: space-between;
}
.list-header {
  font-family: "Times New Roman";
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 40px;
  color: #494949;
}
.see-all-header {
  font-family: "Times New Roman";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 17px;
  align-items: flex-end;
  color: #494949;
  padding-top: 18px;
}
.book-cover-container {
  height: 300px;
  width: 220px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.book-name-container {
  padding-left: 5px;
  padding-top: 5px;
  width: 213px;
  font-family: "Times New Roman";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 17px;
  display: flex;
  align-items: flex-end;
  color: #000000;
  justify-content: space-between;
}
.book-author-container {
  padding-left: 5px;
  font-family: "Times New Roman";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: flex-end;
  color: #000000;
}
.books-container {
  padding: 25px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin: 0 -10px;
}

.books-container::-webkit-scrollbar {
  display: none;
}

.books-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.add-btn {
  background: #ae0000;
  border-radius: 5px;
  color: white;
  font-size: 12px;
}

.add-btn .v-icon {
  color: white;
}
.discount-offer {
  top: 10px;
  right: 10px;
  height: 25px;
  background-color: #f3f0e9;
  color: #ae0000;
  border: 1px solid black;
  text-align: center;
}

@media (max-width: 991.98px) {
  .main-container {
    height: auto;
    margin-top: 10px;
  }
  .list-header {
    font-size: 28px;
    line-height: 32px;
  }
  .see-all-header {
    font-size: 14px;
    line-height: 12px;
  }
  .book-author-container {
    padding-top: 3px;
    font-size: 10px;
    line-height: 12px;
  }

  .discount-offer {
    top: 5px;
    right: 5px;
    height: 20px;
    font-size: 10px;
    line-height: 20px;
  }
}
</style>
