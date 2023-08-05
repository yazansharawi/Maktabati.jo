<template>
  <div>
    <Nav />

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

        <!-- <div class="header-search">
          <div class="search-container">
            <div class="red-box">hi</div>
            <div class="search-btn">
              <v-btn class="rounded-btn" elevation="0">hi</v-btn>
            </div>
          </div>
        </div> -->
      </div>

      <div class="right-div">
        <!-- Content for the blue div on the right -->
      </div>
    </div>

    <!-- BestSellers list-->
    <BookLists :background-color="'white'" :sectionName="'BestSellers'" />

    <!-- Offers list-->
    <!-- for now we will use :isOffer prop , but in the future we will get the offers from the api -->
    <BookLists
      :background-color="'#F3F0E9'"
      :sectionName="'Offers'"
      :isOffer="true"
    />

    <!-- Offers list-->
    <BookLists
      :background-color="'white'"
      :sectionName="'Based On Your Search'"
    />

    <AboutAuthors />

    <div style="height: 320px"></div>
    <Footer />
  </div>
</template>

<script>
import Nav from "./Navs/nav-bar.vue";
import Footer from "./Footer/footer.vue";
import BookLists from "./Books-list/Books-list.vue";
import AboutAuthors from "./About-authors-list/Authors-list.vue"
export default {
  name: "HomePage",
  components: {
    Nav,
    Footer,
    BookLists,
    AboutAuthors
  },
  data() {
    return {
      isWideScreen: window.innerWidth >= 992,
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.isWideScreen = window.innerWidth >= 992;
    },
  },
};
</script>

<style scoped>
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
  background-color: green;
  height: 500px;
  flex: 1;
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
