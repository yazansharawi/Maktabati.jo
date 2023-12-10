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
              @click="getBooks()"
              density="compact"
              prepend-icon="mdi-magnify"
              class="mt-1"
            >
              Search
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
                  <v-btn elevation="0" color="#f3f0e9" class="pa-0">
                    <star-rating
                      :show-rating="false"
                      :read-only="true"
                      :star-size="15"
                      :increment="0.5"
                      v-model="ratings[index]"
                    />
                    <div>& Up</div>
                  </v-btn>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel elevation="0" style="background-color: #f3f0e9">
              <v-expansion-panel-title
                expand-icon="mdi-plus"
                collapse-icon="mdi-minus"
              >
                Book Type
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div
                  v-for="(type, index) in bookTypes"
                  :key="index"
                  style="display: flex"
                  class="mb-1"
                >
                  <input
                    type="checkbox"
                    v-model="checkedBookType[index]"
                    class="mr-2"
                  />
                  {{ type }}
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel elevation="0" style="background-color: #f3f0e9">
              <v-expansion-panel-title
                expand-icon="mdi-plus"
                collapse-icon="mdi-minus"
              >
                Language
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div
                  v-for="(Language, index) in Languages"
                  :key="index"
                  style="display: flex"
                  class="mb-1"
                >
                  <input
                    type="checkbox"
                    v-model="checkedLanguages[index]"
                    class="mr-2"
                  />
                  {{ Language }}
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
            @click="resetFilter()"
            class="mt-3"
            :disabled="enableClearButton"
          >
            Clear
          </v-btn>
        </div>
      </div>
      <div class="right-div">
        <div class="results-header">Results</div>
        <div class="book-grid">
          <div v-for="index in 20" :key="index">
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
                <img
                  src="https://ucarecdn.com/472f5659-20c0-4135-be84-8b7534ed5c0c/ego1.png"
                  alt="Book Image"
                  style="height: 220px; width: 170px"
                />
              </div>
              <div style="display: flex">
                <div class="mr-5" style="font-size: 15px">A Choice Of God</div>
                <div style="font-size: 15px">$32.00</div>
              </div>
              <div style="font-size: 15px">By: Clifford D. Simak</div>
              <div>
                <star-rating
                  :show-rating="false"
                  :read-only="true"
                  :star-size="15"
                  :increment="0.5"
                />
              </div>
            </div>
          </div>
        </div>
        <v-pagination :length="numPages" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Nav from "../components/Navs/main-navbar.vue";
import StarRating from "vue-star-rating";
import Footer from "../components/Footer/footer.vue";
export default {
  name: "ShopPage",
  components: {
    Nav,
    StarRating,
    Footer,
  },
  created() {
    this.getBooks();
  },
  data() {
    return {
      showDiv: false,
      enableClearButton:false,
      ratings: [4, 3, 2, 1, 5],
      Conditions: ["New ", "Used"],
      Audiences: ["Childern", "Adults", "Young Adults"],
      Languages: ["Arabic", "English", "Other"],
      bookTypes: ["Paper Books", "eBooks"],
      sorting: [
        "Most Recent",
        "Title (A-Z)",
        "Tilte (Z-A)",
        "Best Selling",
        "Publication date (Newest)",
        "Publication date (Oldest)",
      ],
      checkedConditions: [],
      checkedGeners: [],
      checkedLanguages: [],
      checkedAuthors: [],
      checkedAudience: [],
      checkedBookType: [],
      checkedSort: [],
      isLargeScreen: window.innerWidth >= 768,
    };
  },
  computed: {
    numPages() {
      const booksPerPage = 20;
      return Math.ceil(60 / booksPerPage);
    },
  },
  mounted() {
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      this.isLargeScreen = window.innerWidth >= 768;
    },
    toggleDiv() {
      this.showDiv = !this.showDiv;
    },
    getBooks() {
      this.enableClearButton = true;
      let data = {
        bookCondition: this.checkedConditions,
        bookRating: this.ratings,
        bookAudience: this.checkedAudience,
        bookLanguage: this.checkedLanguages,
        bookType: this.checkedBookType,
        sortBooksBy: this.checkedSort,
        bookGener: this.checkedGeners,
        bookAuthor: this.checkedAuthors,
      };
      console.log("data", data);
    },
    resetFilter() {
      console.log("reset");
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
