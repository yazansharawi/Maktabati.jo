<template>
  <div>
    <RentBookDialog
      :model="DialogVisible"
      @update:model="(DialogVisible = $event), (this.eventDialog = true)"
      :bookInfo="this.book"
      @Accepted="this.Accepted = true"
    />
    <eventDialog
      :model="eventDialog"
      @update:model="eventDialog = $event"
      :eventType="status"
      :Accepted="this.Accepted"
    />
    <div v-if="!this.book">
      <v-skeleton-loader
        type="article"
        v-for="n in 10"
        :key="n"
      ></v-skeleton-loader>
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
              <v-btn
                elevation="0"
                color="#4C6B8A"
                class="mr-10"
                @click="DialogVisible = true"
                :disabled="isRented"
              >
                <v-icon size="1rem" class="mr-1"> mdi-book </v-icon>
                <span style="color: white" v-if="!isRented">
                  Rent this Book</span
                >
                <span style="color: white" v-else> Rented</span>
              </v-btn>
              <v-btn
                elevation="0"
                color="#AE0000"
                @click="addToShopCart()"
                :disabled="this.addedToShopCart"
              >
                <v-icon size="1rem" class="mr-1"> mdi-cart </v-icon>
                <span style="color: white">
                  {{ this.addedToShopCart ? "Added" : "Add to Cart" }}</span
                >
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
import RentBookDialog from "../components/dialogs/rentBookDialog.vue";
import eventDialog from "../components/dialogs/eventsDialog.vue";
export default {
  name: "BookOverview",

  components: {
    bookOverviewNavbarVue,
    divsSection,
    authorSection,
    topicsSection,
    BookInfoSection,
    Footer,
    RentBookDialog,
    eventDialog,
  },
  created() {
    this.getBookInfo();
    this.shoppingCartStatus();
  },
  data() {
    return {
      tags: [],
      book: null,
      DialogVisible: false,
      bookRentalStatus: {},
      isRented: false,
      addedToShopCart: false,
      status: null,
      eventDialog: false,
      Accepted:false
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  watch: {
    book(newVal) {
      if (newVal) {
        this.updateRentalStatus();
        this.shoppingCartStatus();
      }
    },
  },
  methods: {
    updateRentalStatus() {
      if (this.book && Array.isArray(this.$userRentedBooks)) {
        this.isRented = this.$userRentedBooks.includes(this.book.id);
      }
      this.status = "rented";
    },
    shoppingCartStatus() {
      if (this.book && Array.isArray(this.$userShoppingCart)) {
        this.addedToShopCart = this.$userShoppingCart.includes(this.book.id);
      }
    },

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
    addToShopCart() {
      let data = {
        bookId: this.book.id,
        storeId: this.book.storeId,
      };
      this.$axios
        .post(
          `shopping-cart/add-to-shop-cart-by-user-uuid/${this.$store.getters.user.uuid}`,
          data
        )
        .then(() => {
          this.eventDialog = true;
          this.status = "addedToCart";
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
