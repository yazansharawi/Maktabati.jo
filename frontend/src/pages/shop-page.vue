<template>
  <div>
    <Nav />
    <div style="display: flex" class="main-div">
      <div
        :style="{
          display: 'flex',
          flex: '0.25',
          flexDirection: 'column',
          backgroundColor: '#f3f0e9',
          borderRight: isLargeScreen ? '1px solid #494949' : 'none',
        }"
      >
        <v-btn
          @click="toggleDiv"
          v-if="!isLargeScreen"
          elevation="0"
          color="#f3f0e9"
        >
          <v-icon size="1.3rem" color="#494949" class="mr-1">mdi-filter</v-icon
          ><span style="font-size: 20px; color: #494949">Filters</span></v-btn
        >
        <div v-if="showDiv || isLargeScreen">
          <div
            style="
              padding-top: 15px;
              display: flex;
              justify-content: space-between;
            "
            class="px-2"
          >
            <div style="display: inline-block; text-align: left">
              <v-icon size="1.3rem" color="#494949" class="mb-1 mr-1"
                >mdi-filter</v-icon
              ><span style="font-size: 20px; color: #494949">Filters</span>
            </div>
            <v-btn
              style="font-size: 10px"
              elevation="0"
              color="#AE0000"
              @click="resetFilter()"
              density="compact"
              prepend-icon="mdi-magnify"
              class="mt-1"
              v-if="enableClearButton"
            >
              Clear
            </v-btn>
          </div>
          <v-expansion-panels>
            <v-expansion-panel elevation="0" style="background-color: #f3f0e9">
              <v-expansion-panel-title
                expand-icon="mdi-plus"
                collapse-icon="mdi-minus"
              >
                Sort
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div
                  v-for="(sort, index) in sorting"
                  :key="index"
                  style="display: flex"
                  class="mb-1"
                >
                  <input
                    type="checkbox"
                    v-model="checkedSort[index]"
                    class="mr-2"
                  />
                  {{ sort }}
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel elevation="0" style="background-color: #f3f0e9">
              <v-expansion-panel-title
                expand-icon="mdi-plus"
                collapse-icon="mdi-minus"
              >
                Avg. Customer Review
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div
                  v-for="(rating, index) in ratings"
                  :key="index"
                  style="display: flex"
                  class="mb-1 pa-0"
                >
                  <input
                    type="checkbox"
                    v-model="ratingsSelected[index]"
                    class="mr-2"
                  />
                  {{ ratings[index] }} Star Book
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel elevation="0" style="background-color: #f3f0e9">
              <v-expansion-panel-title
                expand-icon="mdi-plus"
                collapse-icon="mdi-minus"
              >
                Geners
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div style="max-height: 250px; overflow-y: auto">
                  <div
                    v-for="(Gener, index) in $genreOptions"
                    :key="index"
                    style="display: flex"
                    class="mb-1"
                  >
                    <input
                      type="checkbox"
                      v-model="checkedGeners[index]"
                      class="mr-2"
                    />
                    {{ Gener }}
                  </div>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel elevation="0" style="background-color: #f3f0e9">
              <v-expansion-panel-title
                expand-icon="mdi-plus"
                collapse-icon="mdi-minus"
              >
                Condition
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div
                  v-for="(Condition, index) in Conditions"
                  :key="index"
                  style="display: flex"
                  class="mb-1"
                >
                  <input
                    type="checkbox"
                    v-model="checkedConditions[index]"
                    class="mr-2"
                  />
                  {{ Condition }}
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel elevation="0" style="background-color: #f3f0e9">
              <v-expansion-panel-title
                expand-icon="mdi-plus"
                collapse-icon="mdi-minus"
              >
                Authors
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div style="max-height: 250px; overflow-y: auto">
                  <div
                    v-for="(Author, index) in $authorOptions"
                    :key="index"
                    style="display: flex"
                    class="mb-1"
                  >
                    <input
                      type="checkbox"
                      v-model="checkedAuthors[index]"
                      class="mr-2"
                    />
                    {{ Author }}
                  </div>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel elevation="0" style="background-color: #f3f0e9">
              <v-expansion-panel-title
                expand-icon="mdi-plus"
                collapse-icon="mdi-minus"
              >
                Audience
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div
                  v-for="(Audience, index) in Audiences"
                  :key="index"
                  style="display: flex"
                  class="mb-1"
                >
                  <input
                    type="checkbox"
                    v-model="checkedAudience[index]"
                    class="mr-2"
                  />
                  {{ Audience }}
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <div class="px-2">
          <v-btn
            block
            style="font-size: 15px"
            elevation="0"
            color="#AE0000"
            @click="getBooks()"
            class="mt-3"
          >
            Search
          </v-btn>
        </div>
      </div>
      <div class="right-div">
        <div class="results-header">Results</div>
        <div class="book-grid" v-if="paginatedBooks && !loader">
          <div v-for="(book, index) in paginatedBooks" :key="index">
            <div style="display: flex; flex-direction: column; gap: 2px">
              <div
                style="
                  height: 220px;
                  width: 170px;
                  flex-direction: column;
                  justify-content: center;
                  display: flex;
                  position: relative;
                  align-items: center;
                "
              >
                <router-link
                  :to="{
                    name: 'BookOverView',
                    params: { id: book.id },
                    query: { isHomePage: false },
                  }"
                  style="text-decoration: none; color: inherit"
                >
                  <div class="book-cover-container">
                    <img
                      :src="book.image"
                      alt="Book Image"
                      style="height: 220px; width: 170px"
                    />
                  </div>
                </router-link>
              </div>
              <div style="display: flex">
                <div style="display: flex">
                  <div
                    class="mr-5 text-truncate"
                    style="font-size: 15px; max-width: 100px"
                  >
                    {{ book.title }}
                  </div>
                  <div style="font-size: 15px">${{ book.price }}</div>
                </div>
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
            </div>
          </div>
        </div>
        <div v-else class="loader">
          <v-skeleton-loader
            type="card"
            v-for="n in 3"
            :key="n"
          ></v-skeleton-loader>
        </div>
        <div v-if="paginatedBooks.length == 0" class="notFoundPage">
          <v-icon size="6rem" color="#AE0000"> mdi-magnify </v-icon>
          <div style="color: #494949">
            Oops, We didn't find what you were looking for
          </div>
        </div>

        <v-pagination
          :length="numPages"
          :total-visible="2"
          v-model="page"
          v-if="paginatedBooks && !loader && paginatedBooks.length != 0"
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Nav from "../components/Navs/main-navbar.vue";
import Footer from "../components/Footer/footer.vue";
export default {
  name: "ShopPage",
  components: {
    Nav,
    Footer,
  },
  created() {
    this.getBooks();
  },
  data() {
    return {
      loader: false,
      booksPerPage: 12,
      page: 1,
      books: null,
      showDiv: false,
      enableClearButton: false,
      Conditions: ["New", "Used"],
      Audiences: ["Childern", "Adults", "Young Adults", "Other"],
      Languages: ["Arabic", "English", "Other"],
      sorting: [
        "Tilte (Z-A)",
        "Best Selling",
        "Publication date (Newest)",
        "Publication date (Oldest)",
        "Highest Price",
        "Lowest Price",
      ],
      checkedConditions: [],
      checkedGeners: [],
      checkedAuthors: [],
      checkedAudience: [],
      checkedBookType: [],
      checkedSort: [],
      ratingsSelected: [false, false, false, false, false],
      selectedRatings: [],
      isLargeScreen: window.innerWidth >= 768,
      selectedConditions: [],
      selectedSorts: [],
      selectedAudience: [],
      selectedGenres: [],
      selectedAuthors: [],
      ratings: [1, 2, 3, 4, 5],
    };
  },
  computed: {
    numPages() {
      return Math.ceil(
        (this.books ? this.books.length : 0) / this.booksPerPage
      );
    },
    paginatedBooks() {
      if (!this.books) return [];

      const startIndex = (this.page - 1) * this.booksPerPage;
      const endIndex = startIndex + this.booksPerPage;

      return this.books.slice(startIndex, endIndex);
    },
  },
  mounted() {
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    checkScreenSize() {
      this.isLargeScreen = window.innerWidth >= 768;
    },
    toggleDiv() {
      this.showDiv = !this.showDiv;
    },
    getBooks() {
      this.loader = true;
      this.scrollToTop();
      this.selectedSorts = this.checkedSort
        .map((value, index) => (value ? this.sorting[index] : null))
        .filter(Boolean);
      this.selectedGenres = this.checkedGeners
        .map((value, index) => (value ? this.$genreOptions[index] : null))
        .filter(Boolean);
      this.selectedConditions = this.checkedConditions
        .map((value, index) => (value ? this.Conditions[index] : null))
        .filter(Boolean);
      this.selectedAuthors = this.checkedAuthors
        .map((value, index) => (value ? this.$authorOptions[index] : null))
        .filter(Boolean);
      this.selectedAudience = this.checkedAudience
        .map((value, index) => (value ? this.Audiences[index] : null))
        .filter(Boolean);

      if (Array.isArray(this.ratings) && Array.isArray(this.ratingsSelected)) {
        this.selectedRatings = this.ratings
          .filter((_, index) => this.ratingsSelected[index])
          .map((rating) => rating);
      } else {
        console.error("Ratings or ratingsSelected arrays are not defined");
        return;
      }
      const params = {
        bookCondition: this.selectedConditions,
        bookRating: this.selectedRatings,
        bookAudience: this.selectedAudience,
        sortBooksBy: this.selectedSorts,
        genre: this.selectedGenres,
        bookAuthor: this.selectedAuthors,
      };

      if (
        this.selectedRatings.length ||
        this.selectedRatings.length ||
        this.selectedAudience.length ||
        this.selectedSorts.length ||
        this.selectedGenres.length ||
        this.selectedAuthors.length
      ) {
        this.enableClearButton = true;
      }

      this.$axios
        .get("book", { params })
        .then(async (response) => {
          this.books = response.data;
          this.loader = false;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },

    resetFilter() {
      this.selectedAuthors = [];
      this.selectedGenres = [];
      this.selectedAudience = [];
      this.selectedRatings = [];
      this.ratingsSelected = [];
      this.selectedConditions = [];
      this.selectedSorts = [];
      this.checkedConditions = [];
      this.checkedGeners = [];
      this.checkedAuthors = [];
      this.checkedAudience = [];
      this.checkedSort = [];
      this.enableClearButton = false;
      this.getBooks();
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 768px) {
  .main-div {
    flex-direction: column;
  }
  .main-div .book-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .results-header {
    text-align: center;
    font-size: 20px;
  }
  .right-div {
    display: flex;
    flex: 1;
    padding: 15px;
    flex-direction: column;
    gap: 20px;
    padding-top: 5px;
    justify-content: center;
    align-items: center;
  }
  .loader {
    width: 100%;
  }
  .notFoundPage {
    height: auto;
  }
}

.notFoundPage {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.add-btn {
  background: #ae0000;
  border-radius: 5px;
  color: white;
}

.add-btn .v-icon {
  color: white;
}
.book-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
}
.results-header {
  font-size: 40px;
  color: #494949;
  font-weight: bold;
}
.right-div {
  display: flex;
  flex: 1;
  padding: 15px;
  flex-direction: column;
  gap: 20px;
  padding-top: 5px;
}
</style>
