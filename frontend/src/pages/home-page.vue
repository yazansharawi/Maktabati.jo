<template>
  <div>
    <Nav />

    <div style="display: flex; flex-direction: column; gap: 20px">
      <div class="container-fluid main-container">
        <div class="left-div">
          <div v-if="this.isWideScreen" class="header-text">
            What Books are you <br />
            looking for?
          </div>
          <div v-else>What Books are you looking for?</div>
          <div class="sub-text" v-if="isWideScreen">
            Not Sure What To Read next? Explore Our Catalog With<br />
            Public Domain With Our Editors
          </div>
          <div class="sub-text" v-else>
            Not Sure What To Read next? Explore Our Catalog With Public Domain
            With Our Editors
          </div>

          <div class="search-field">
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
        </div>

        <div class="right-div">
          <img
            src="https://ucarecdn.com/472f5659-20c0-4135-be84-8b7534ed5c0c/ego1.png"
            style="max-height: 430px; padding-left: 250px"
          />
          <img
            src="https://ucarecdn.com/127a9916-61d1-4fdc-a7a0-35ad22d4d95a/81ym3QUd3KL_AC_UF10001000_QL80_.jpg"
            style="max-height: 430px; padding-left: 200px"
          />
          <img
            src="https://ucarecdn.com/7273fd71-8e03-4bb3-a1da-42afd9977ce1/71ucpucTRL_AC_UF10001000_QL80_.jpg"
            style="max-height: 430px"
          />
        </div>
      </div>
      <div v-if="!bestSellersData">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>
      <!-- BestSellers list-->
      <BookLists
        :background-color="'white'"
        :sectionName="'BestSellers'"
        :books="bestSellersData"
        :isHomePage="true"
      />

      <!-- Offers list-->
      <!-- for now we will use :isOffer prop , but in the future we will get the offers from the api -->

      <div v-if="!hasOfferData">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>

      <BookLists
        :background-color="'#F3F0E9'"
        :sectionName="'Offers'"
        :isOffer="true"
        :books="hasOfferData"
        :isHomePage="true"
      />

      <div v-if="!this.$userLastFiveSearches">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>

      <div
        v-else-if="this.$userLastFiveSearches.length === 0"
        style="
          display: flex;
          justify-content: center;
          font-size: 40px;
          align-items: center;
          height: 10vh;
        "
      >
        No Data
      </div>
      <BookLists
        v-else
        :background-color="'white'"
        :sectionName="'Based On Your Search'"
        :isHomePage="true"
        :books="this.$userLastFiveSearches.books"
      />

      <AboutAuthors :authors="authors" :hideseeAll="true" />

      <Footer />
    </div>
  </div>
</template>

<script>
import Nav from "../components/Navs/main-navbar.vue";
import Footer from "../components/Footer/footer.vue";
import BookLists from "../components/Book-components/Books-list.vue";
import AboutAuthors from "../components/About-authors-list/Authors-list.vue";
export default {
  name: "HomePage",
  components: {
    Nav,
    Footer,
    BookLists,
    AboutAuthors,
  },
  data() {
    return {
      isWideScreen: window.innerWidth >= 992,
      bestSellersData: null,
      hasOfferData: null,
      authors: null,
      searchQuery: "",
      searchResults: [],
      showDropdown: false,
    };
  },
  created() {
    this.getBestSellers();
    this.getHasOffer();
    this.getAuthors();
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
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
    handleResize() {
      this.isWideScreen = window.innerWidth >= 992;
    },
    getBestSellers() {
      this.$axios
        .get("book/best-sellers")
        .then(async (response) => {
          this.bestSellersData = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    getHasOffer() {
      this.$axios
        .get("book/has-offer")
        .then(async (response) => {
          this.hasOfferData = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    getAuthors() {
      this.$axios.get("authors/main-page").then(async (response) => {
        this.authors = response.data;
      });
    },
  },
};
</script>

<style scoped>
.search-input {
  width: 100%;
  padding: 5px;
  border: #494949 1px solid;
  font-size: 20px;
  border-radius: 10px;
}
.search-field {
  width: 60%;
  margin-top: 20px;
}
.dropdown {
  position: absolute;
  background-color: #f6f6f6;
  width: 29%;
  border: 1px solid #ddd;
  z-index: 100;
  border-radius: 10px;
}
.dropdown-item {
  padding: 8px 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  font-size: 30px;
  border-radius: 10px;
}

.dropdown-item:hover {
  background-color: #eee;
}
.main-container {
  display: flex;
  width: 100%;
  margin-top: 50px;
}

.left-div {
  height: 500px;
  font-family: "Times New Roman";
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 55px;
  padding-left: 20px;
  color: #494949;
  flex: 1;
}

.right-div {
  height: 500px;
  flex: 1;
  display: flex;
}

.right-div img {
  position: absolute;
  z-index: 1;
}

.right-div img:nth-child(2) {
  z-index: 2;
  padding-left: 40px;
}

.right-div img:nth-child(3) {
  z-index: 3;
}

.header-text {
  padding-top: 90px;
}

.sub-text {
  font-family: "Times New Roman";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 25px;
  padding-top: 20px;
  padding-left: 7px;
  color: #494949;
  line-height: 30px;
}

.red-box {
  background-color: red;
  border-radius: 20px 0 0 20px;
  width: 450px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-search {
  padding-top: 20px;
  width: 500px;
}

.search-btn {
  padding-bottom: 7px;
}

.rounded-btn {
  background-color: green;
  width: 90px;
  height: 50px;
  border-radius: 0 20px 20px 0;
}

.search-container {
  display: flex;
  align-items: center;
}
@media (max-width: 991.98px) {
  .dropdown {
    width: 90%;
  }
  .search-field {
    width: 100%;
  }
  .main-container {
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }

  .left-div {
    padding-top: 10px;
    font-size: 30px;
    width: 100%;
    text-align: center;
    padding-left: 0px;
  }

  .right-div,
  .sub-text {
    display: none;
  }

  .header-text {
    text-align: center;
    padding-top: 20px;
  }

  .header-search {
    text-align: center;
  }
  .rounded-btn {
    background-color: green;
    padding-bottom: 4px;
  }
  .search-btn {
    padding-bottom: 5px;
  }
}
</style>
