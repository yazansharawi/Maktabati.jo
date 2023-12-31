<template>
  <myRentedBooks
    :model="myRentBooksDialog"
    @update:model="myRentBooksDialog = $event"
  />
  <userWishList
    :model="userWishListDialog"
    @update:model="userWishListDialog = $event"
  />
  <userShoppingCart
    :model="userShoppingCartDialog"
    @update:model="userShoppingCartDialog = $event"
  />
  <editUserInfoDialog
    :model="editUserDialog"
    @update:model="editUserDialog = $event"
  />
  <div class="nav-container">
    <nav
      class="navbar navbar-expand-lg"
      :style="{ padding: isGetUserPage ? '0px' : '' }"
    >
      <div class="container-fluid">
        <div
          :class="{
            NavHeader: !isGetUserPage,
            'NavHeader centered-header': isGetUserPage,
          }"
          :style="{ 'font-size': isGetUserPage ? '40px' : '' }"
        >
          Maktabti.jo
        </div>
        <button
          v-if="!isGetUserPage"
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          v-if="!isGetUserPage"
          class="collapse navbar-collapse NavElements"
          id="navbarSupportedContent"
        >
          <div class="nav-search-field">
            <input
              type="text"
              v-model="searchQuery"
              @input="handleSearch"
              class="search-input"
              placeholder="Book Name"
            />
            <div class="dropdown" v-if="showDropdown">
              <div v-if="searchResults.length > 0">
                <div
                  class="dropdown-item"
                  v-for="book in searchResults"
                  :key="book"
                  @click="goToBook(book)"
                >
                  {{ book.title }}
                </div>
              </div>
              <div class="dropdown-item" v-else>No Results Found</div>
            </div>
          </div>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item mr-3" v-for="item in navItems" :key="item.id">
              <router-link
                style="text-decoration: none; color: inherit"
                :to="item.link"
                >{{ item.label }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="red-div">
        <div v-if="!isGetUserPage">
          <v-container fluid>
            <v-row justify="center">
              <v-menu min-width="200px" rounded>
                <template v-slot:activator="{ props }">
                  <v-btn icon v-bind="props" elevation="0">
                    <v-avatar size="large">
                      <v-icon
                        size="2.3rem"
                        color="#ae0000"
                        style="padding-top: 25px"
                      >
                        mdi-account
                      </v-icon></v-avatar
                    >
                  </v-btn>
                </template>
                <v-card>
                  <v-card-text>
                    <div class="mx-auto text-center">
                      <h3>{{ this.user.firstName + this.user.lastName }}</h3>
                      <p class="text-caption mt-1">
                        {{ this.user.email }}
                      </p>
                      <v-divider class="my-3"></v-divider>
                      <v-btn
                        rounded
                        variant="text"
                        @click="myRentBooksDialog = true"
                      >
                        My Rented Books
                      </v-btn>
                      <v-divider class="my-3"></v-divider>
                      <v-btn
                        rounded
                        variant="text"
                        @click="userWishListDialog = true"
                      >
                        WishList
                      </v-btn>
                      <v-divider class="my-3"></v-divider>
                      <v-btn
                        rounded
                        variant="text"
                        @click="userShoppingCartDialog = true"
                      >
                        Shopping Cart
                      </v-btn>
                      <v-divider class="my-3"></v-divider>
                      <v-btn
                        rounded
                        variant="text"
                        @click="editUserDialog = true"
                      >
                        Edit Account
                      </v-btn>
                      <v-divider class="my-3"></v-divider>
                      <v-btn rounded variant="text" @click="logout">
                        Log Out
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-menu>
            </v-row>
          </v-container>
        </div>
      </div>
      <div class="right-angle-triangle"></div>
      <div class="left-angle-triangle"></div>
    </nav>
  </div>
</template>

<script>
import myRentedBooks from "../dialogs/myRentedBookDialog.vue";
import userWishList from "../dialogs/wishListDialog.vue";
import userShoppingCart from "../dialogs/shoppingCartDilaog.vue";
import editUserInfoDialog from "../dialogs/editUserProfileDialog.vue";
export default {
  name: "NavBar",

  components: {
    myRentedBooks,
    userWishList,
    userShoppingCart,
    editUserInfoDialog,
  },
  data() {
    return {
      isMobile: false,
      user: null,
      searchQuery: "",
      searchResults: [],
      showDropdown: false,
      myRentBooksDialog: false,
      userWishListDialog: false,
      userShoppingCartDialog: false,
      editUserDialog: false,
    };
  },
  props: {
    isGetUserPage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    navItems() {
      let items = [
        { id: 1, label: "Home", link: "/" },
        { id: 2, label: "Shop", link: "/shop" },
        { id: 3, label: "Categories", link: "/categories" },
        { id: 4, label: "Community", link: "/community" },
      ];

      if (this.isMobile) {
        items.push({ id: 6, label: "User Settings", link: "" });
      }

      return items;
    },
  },
  mounted() {
    this.$store.dispatch("checkAuthentication");
    const userProxy = this.$store.getters.user;
    this.user = Object.assign({}, userProxy);
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");

      this.$router.push({ name: "logInPage" });
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 992;
    },
    async handleSearch() {
      if (this.searchQuery.length > 2) {
        try {
          const response = await this.$axios.get(
            `/book/get-Books-by-name/${this.searchQuery}`
          );
          this.searchResults = response.data;
          this.showDropdown = true;
        } catch (error) {
          console.error(error);
          this.searchResults = [];
          this.showDropdown = false;
        }
      } else {
        this.searchResults = [];
        this.showDropdown = false;
      }
    },
    goToBook(book) {
      if (book && book.genre) {
        this.$axios.put(
          `user/user-recent-searches/${this.$store.getters.user.uuid}`,
          { genre: book.genre }
        );
      }
      this.$router.push({ name: "BookOverView", params: { id: book.id } });
      this.showDropdown = false;
    },
  },
};
</script>

<style scoped>
.nav-container {
  background-color: #f3f0e9;
}
.NavHeader {
  margin: 10px;
  padding-right: 30px;
  font-size: 30px;
  font-family: "Times New Roman";
  color: #494949;
  font-weight: 700;
}

.NavElements {
  color: #494949;
  padding-left: 10px;
  font-family: "Times New Roman";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
}

.NavElements a {
  text-decoration: none;
  color: #494949;
  margin-right: 15px;
}
.nav-search-field {
  margin-bottom: 10px;
  position: absolute;
  right: 220px;
  width: 300px;
  height: 30px;
}
.red-div {
  right: 70px;
  position: absolute;
  width: 50px;
  height: 90px;
  background-color: #ae0000;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.right-angle-triangle {
  margin-top: 130px;
  position: absolute;
  right: 70px;
  border-width: 0 25px 40px 0;
  border-style: solid;
  border-color: transparent #ae0000 transparent transparent;
}
.left-angle-triangle {
  margin-top: 130px;
  position: absolute;
  right: 95px;
  border-width: 40px 25px 0 0;
  border-style: solid;
  border-color: #ae0000 transparent transparent transparent;
}
.white-circle {
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 20px;
  margin: 20px auto;
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.dropdown {
  position: absolute;
  background-color: #f6f6f6;
  width: 100%;
  border: 1px solid #ddd;
  z-index: 100;
}

.dropdown-item {
  padding: 8px 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.dropdown-item:hover {
  background-color: #eee;
}
@media (max-width: 992px) {
  .dropdown {
    min-width: 85%;
  }
  .centered-header {
    padding-top: 85px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 35px;
  }
  .red-div,
  .right-angle-triangle,
  .left-angle-triangle {
    display: none;
  }
  .nav-search-field {
    position: static;
    margin-bottom: 40px;
    width: 90%;
  }
  .NavElements a {
    padding-right: 0;
    margin-bottom: 5px;
  }

  .NavElements {
    color: #494949;
    padding-left: 10px;
    font-family: "Times New Roman";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
  }
}
</style>
