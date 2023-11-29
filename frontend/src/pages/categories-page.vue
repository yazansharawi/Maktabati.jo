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
    <BookLists
      v-for="(genre, index) in genres"
      :key="index"
      :background-color="genre.backgroundColor"
      :sectionName="genre.name"
      :books="genre.books"
    />
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
      shuffledGenres: null,
      currentIndex: 0,
      genres: [],
      images: [
        "https://ucarecdn.com/472f5659-20c0-4135-be84-8b7534ed5c0c/ego1.png",
        "https://ucarecdn.com/9fbe3178-775b-41de-a84e-fd5bcdddc3ff/51xp6sg2TCL_AC_UF10001000_QL80_.jpg",
        "https://ucarecdn.com/e0336138-b932-4328-8910-f065e4605075/614fg2kN44L_AC_UF10001000_QL80_.jpg",
      ],
      titleOfTheBook: [
        "'Greatness comes from humble beginnings; it comes from grunt work. It means you're the least important person in the room—until you change that with results. ego is the enemy of what you want and of what you have: Of mastering a craft'",
        "'People think focus means saying yes to the thing you've got to focus on. But that's not what it means at all. It means saying no to the hundred other good ideas that there are. You have to pick carefully'",
        "'It's the execution of ideas that really separates the sheep from the goats. As iron sharpens iron, so one man sharpens another. Profits Aren't Everything, They're the Only Thing. People with the ability and the audacity to think big carve the path to greatness.'",
      ],
      captions: ["Ryan Holiday", "Walter Isaacson", "Rita Gunther McGrath"],
    };
  },
  mounted() {
    setInterval(this.nextSlide, 3000);
  },
  created() {
    this.getBooks();
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    getRandomGenres() {
      this.shuffledGenres = this.$genreOptions.sort(() => Math.random() - 0.5);
    },
    getBooks() {
      this.getRandomGenres();
      const selectedGenres = this.shuffledGenres.slice(0, 5);

      this.$axios
        .get("book/by-genre/" + selectedGenres.join(","))
        .then(async (response) => {
          this.genres = Object.keys(response.data).map((genre, index) => ({
            name: genre,
            backgroundColor: index % 2 === 0 ? "white" : "#F3F0E9",
            books: response.data[genre],
          }));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
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
  height: 450px;
  background-color: #f3f0e9;
  display: flex;
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
