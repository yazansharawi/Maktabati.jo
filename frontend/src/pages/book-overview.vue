<template>
  <div>
    <div v-if="!this.book">
      <v-skeleton-loader color="secondary" type="paragraph"></v-skeleton-loader>
    </div>
    <div v-else>
      <bookOverviewNavbarVue
        @nav-item-click="navClicked"
        :isCategoriesPage="this.$route.query.isHomePage"
      />
      <v-row>
        <!-- Left Side -->
        <v-col cols="12" sm="6" style="padding: 0px">
          <div
            style="
              background-color: #f3f0e9;
              height: auto;
              padding: 40px;
              display: flex;
              flex-direction: column;
            "
            class="LeftSide"
          >
            <div style="margin-bottom: 20px">
              <v-icon size="2rem" color="#FFCB45">mdi-star</v-icon>
              <div
                style="
                  display: inline-block;
                  vertical-align: middle;
                  margin-left: 5px;
                  color: #494949;
                  font-size: 21px;
                  font-weight: bold;
                "
              >
                {{ book.bookRating }}
              </div>
            </div>
            <div
              style="font-size: 25px; font-weight: bold; color: #494949"
              class="bookQuote"
            >
              “{{ book.bookQuote }}”
            </div>
            <div
              style="
                font-size: 20px;
                font-weight: bold;
                color: #494949;
                margin-top: 20px;
              "
            >
              {{ book.targetedPeopleText }}
            </div>
            <div
              style="
                display: inline-block;
                margin-top: 30px;
                margin-bottom: 50px;
              "
            >
              <v-btn elevation="0" color="#4C6B8A" class="mr-10">
                <span style="color: white"> Read Demo</span>
              </v-btn>
              <v-btn elevation="0" color="#AE0000">
                <span style="color: white"> Buy Now</span>
              </v-btn>
            </div>
          </div>
        </v-col>
        <!-- Right Side -->
        <v-col cols="12" sm="6" style="text-align: center">
          <div
            style="
              width: 80%;
              height: 100%;
              position: relative;
              margin: auto;
              max-height: 350px;
            "
          >
            <img
              :src="book.image"
              alt="Your Image"
              style="width: 100%; height: 100%; object-fit: contain"
            />
          </div>
        </v-col>
      </v-row>
      <BookInfoSection
        :authorName="book.author.name"
        :numberOfBadges="2"
        :tags="tags"
      />
      <divsSection
        ref="discoverInsightsSection"
        :sectionName="'Discover Insights'"
        :backgroundColor="'linear-gradient(to right, white 50%, #f3f0e9 50%)'"
        :data="book.inThisBooks"
      />
      <topicsSection
        :bookimage="book.image"
        :topics="book.topics"
        ref="topicSection"
      />
      <authorSection
        :authorImg="book.author.image"
        :authorName="book.author.name"
        :authorBio="book.author.shortBrief"
        ref="authorSection"
      />
      <divsSection
        :sectionName="'Reviews'"
        :backgroundColor="'#F3F0E9'"
        :data="book.Reviews"
        ref="reviewSection"
      />
      <Footer />
    </div>
  </div>
</template>

<script>
import bookOverviewNavbarVue from "../components/Navs/book-overview-navbar.vue";
import Footer from "../components/Footer/footer.vue";
import divsSection from "../components/divs-section.vue";
import authorSection from "../components/author-section.vue";
import topicsSection from "../components/topics-section.vue";
import BookInfoSection from "../components/Book-components/Book-info-section.vue";
export default {
  name: "BookOverview",

  components: {
    bookOverviewNavbarVue,
    divsSection,
    authorSection,
    topicsSection,
    BookInfoSection,
    Footer,
  },
  created() {
    this.getBookInfo();
  },
  data() {
    return {
      tags: [],
      book: null,
    };
  },
  methods: {
    navClicked(item) {
      if (item === "About") {
        this.scrollToSection("discoverInsightsSection");
      } else if (item === "Topics") {
        this.scrollToSection("topicSection");
      } else if (item == "Author") {
        this.scrollToSection("authorSection");
      } else {
        this.scrollToSection("reviewSection");
      }
    },
    scrollToSection(refName) {
      const sectionRef = this.$refs[refName];

      if (sectionRef && sectionRef.$el) {
        const offsetTop = sectionRef.$el.offsetTop;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    },
    getBookInfo() {
      this.$axios
        .get("book/by-id/" + this.$route.params.id)
        .then(async (response) => {
          this.tags = response.data.tags;
          this.book = response.data.book;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>
<style scoped>
@media (max-width: 991.98px) {
  .LeftSide {
    align-items: center;
  }
  .bookQuote {
    text-align: center;
  }
}
</style>
