<template>
  <div>
    <Nav />
    <div class="main-div">
      <div class="right-side-header">
        <div stlye="color: #494949;font-weight: bold;">
          Latest picks from each
          <span style="color: #ae0000">Categories</span> recommended by our
          bookstore partners
        </div>
      </div>
      <div
        style="flex: 1; justify-content: center; display: flex; padding: 20px"
      >
        <div
          style="
            flex-direction: column;
            align-items: center;
            gap: 20px;
            display: flex;
          "
        >
          <div>
            <div>
              <transition name="fade" mode="out-in">
                <div :key="currentIndex" class="slide">
                  <img
                    :src="images[currentIndex]"
                    alt="Image"
                    style="height: 250px; width: 180px"
                  />
                </div>
              </transition>
            </div>
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 20px;
            "
          >
            <div>
              {{ titleOfTheBook[currentIndex] }}
            </div>
            <div style="font-weight: bold">- {{ captions[currentIndex] }}</div>
          </div>
        </div>
      </div>
    </div>
    <BookLists :background-color="'white'" :sectionName="'Fiction'" />
    <BookLists :background-color="'#F3F0E9'" :sectionName="'Non-Fiction'" />
    <BookLists :background-color="'white'" :sectionName="'Romance'" />
    <BookLists :background-color="'#F3F0E9'" :sectionName="'Humor'" />
    <BookLists :background-color="'white'" :sectionName="'Science'" />
    <Footer />
  </div>
</template>

<script>
import Nav from "../components/Navs/main-navbar.vue";
import BookLists from "../components/Book-components/Books-list.vue";
import Footer from "../components/Footer/footer.vue";
export default {
  name: "CategoriesPage",
  data() {
    return {
      currentIndex: 0,
      images: [
        "https://ucarecdn.com/472f5659-20c0-4135-be84-8b7534ed5c0c/ego1.png",
        "https://ucarecdn.com/0d4fbe5a-2157-4cdb-84f7-782f294d4df6/hh1.png",
        "https://ucarecdn.com/472f5659-20c0-4135-be84-8b7534ed5c0c/ego1.png",
      ],
      titleOfTheBook: [
        "'Greatness comes from humble beginnings; it comes from grunt work. It means you're the least important person in the room—until you change that with results. ego is the enemy of what you want and of what you have: Of mastering a craft'",
        "'Greatness comes from humble beginnings; it comes from grunt work. It means you're the least important person in the room—until you change that with results. ego is the enemy of what you want and of what you have: Of mastering a craft'",
        "'Greatness comes from humble beginnings; it comes from grunt work. It means you're the least important person in the room—until you change that with results. ego is the enemy of what you want and of what you have: Of mastering a craft'",
      ],
      captions: ["Ryan Holiday", "Ryan Holiday", "Ryan Holiday"],
    };
  },
  mounted() {
    setInterval(this.nextSlide, 3000);
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
  },
  components: {
    Nav,
    BookLists,
    Footer,
  },
};
</script>

<style scoped>
.main-div {
  height: auto;
  background-color: #f3f0e9;
  display: flex;
  border-top: 1px solid #494949;
  flex-direction: row;
}
.right-side-header {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 35px;
  padding-left: 25px;
  padding-right: 25px;
}
@media screen and (max-width: 768px) {
  .main-div {
    height: auto;
    background-color: #f3f0e9;
    display: flex;
    border-top: 1px solid #494949;
    display: flex;
    flex-direction: column;
  }
  .right-side-header {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 35px;
    padding: 30px;
  }
}
</style>
