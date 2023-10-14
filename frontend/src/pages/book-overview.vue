<template>
  <div>
    <bookOverviewNavbarVue />
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
              4.5
            </div>
          </div>
          <div
            style="font-size: 35px; font-weight: bold; color: #494949"
            class="bookQuote"
          >
            “The world can show you the truth, but no one can force you to
            accept it.”
          </div>
          <div
            style="
              font-size: 20px;
              font-weight: bold;
              color: #494949;
              margin-top: 20px;
            "
          >
            A must read for those who seek success
          </div>
          <div
            style="display: inline-block; margin-top: 30px; margin-bottom: 50px"
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
            src="https://ucarecdn.com/472f5659-20c0-4135-be84-8b7534ed5c0c/ego1.png"
            alt="Your Image"
            style="width: 100%; height: 100%; object-fit: contain"
          />
        </div>
      </v-col>
    </v-row>
    <BookInfoSection
      :authorName="'Ryan Holiday'"
      :numberOfBadges="2"
      :badgeIcons="['emoticon', 'rocket-launch']"
      :badgeTexts="['People’s book', 'Top Selling']"
    />
    <divsSection
      :sectionName="'In this Book'"
      :backgroundColor="'linear-gradient(to right, white 50%, #f3f0e9 50%)'"
    />
    <topicsSection />
    <authorSection
      :authorImg="'https://ucarecdn.com/f3e35d9e-8252-40a6-b023-04311cb9638d/egoistheenmy3.png'"
      :authorName="'Ryan Holiday'"
      :authorBio="'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae officia illo sit earum ullam non est blanditiis in animi sed? Excepturi corporis incidunt ipsam nostrum cum dolorum recusandae veniam. Ex!'"
    />
    <divsSection :sectionName="'Reviews'" :backgroundColor="'#F3F0E9'" />
    <Footer />
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
    Footer,
    divsSection,
    authorSection,
    topicsSection,
    BookInfoSection,
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
