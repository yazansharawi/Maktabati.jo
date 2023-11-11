<template>
  <div>
    <div :style="{ backgroundColor: backgroundColor }" class="main-container">
      <div class="headers-container">
        <div class="list-header">{{ sectionName }}</div>
        <div class="see-all-header">See all</div>
      </div>
      <div class="books-scroll-container">
        <div class="books-container">
          <div v-for="(book, index) in books" :key="index" class="book-item">
            <!-- for now offer is a prop , but in the future it will be inlcuded in the data -->
            <div class="book-cover-container">
              <div v-if="isOffer" class="discount-offer">15% offer</div>
            </div>
            <div class="book-name-container">
              <div>{{ book.name }}</div>
              <div>{{ book.price }}</div>
            </div>
            <div class="book-author-container">By: {{ book.author }}</div>
            <div>
              <star-rating
                v-model="book.rating"
                :show-rating="false"
                :read-only="true"
                :star-size="15"
                :increment="0.5"
              ></star-rating>
            </div>
            <div style="padding-top: 5px">
              <v-btn
                prepend-icon="mdi-bag-personal"
                elevation="0"
                class="add-btn"
              >
                Add
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
export default {
  name: "BookList",
  components: {
    StarRating,
  },
  props: {
    backgroundColor: {
      type: String,
      required: false,
      default: "red",
    },
    sectionName: {
      type: String,
      required: false,
      default: null,
    },
    isOffer: {
      type: Boolean,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      rating: 3,
      books: [
        {
          name: "Book 1",
          author: "Author 1",
          price: "$20.00",
          rating: 3,
        },
        {
          name: "Book 2",
          author: "Author 2",
          price: "$25.00",
          rating: 4,
        },
        {
          name: "Book 2",
          author: "Author 2",
          price: "$25.00",
          rating: 4,
        },
        {
          name: "Book 2",
          author: "Author 2",
          price: "$25.00",
          rating: 4,
        },
        {
          name: "Book 2",
          author: "Author 2",
          price: "$25.00",
          rating: 4,
        },
        {
          name: "Book 2",
          author: "Author 2",
          price: "$25.00",
          rating: 4,
        },
        {
          name: "Book 2",
          author: "Author 2",
          price: "$25.00",
          rating: 4,
        },
      ],
    };
  },
  created() {
    this.getBooks();
  },
  methods: {
    getBooks() {
      this.$axios
        .get("book/by-genre/" + this.sectionName)
        .then(async (response) => {
          console.log("hi", response.data);
        });
    },
  },
};
</script>

<style scoped>
.main-container {
  height: 550px;
  background-color: white;
}
.headers-container {
  padding-top: 25px;
  padding-bottom: 10px;
  padding-left: 13px;
  padding-right: 25px;
  display: flex;
  justify-content: space-between;
}
.list-header {
  font-family: "Times New Roman";
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 40px;
  color: #494949;
}
.see-all-header {
  font-family: "Times New Roman";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 17px;
  align-items: flex-end;
  color: #494949;
  padding-top: 18px;
}
.book-cover-container {
  height: 300px;
  width: 220px;
  background-color: green;
}
.book-name-container {
  padding-top: 5px;
  width: 220px;
  font-family: "Times New Roman";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 17px;
  display: flex;
  align-items: flex-end;
  color: #000000;
  justify-content: space-between;
}
.book-author-container {
  padding-top: 5px;
  font-family: "Times New Roman";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: flex-end;
  color: #000000;
}
.books-container {
  padding: 25px;
  height: 450px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin: 0 -10px;
}
.book-item {
  padding-right: 55px;
}
.add-btn {
  background: #ae0000;
  border-radius: 5px;
  color: white;
}

.add-btn .v-icon {
  color: white;
}
.discount-offer {
  top: 10px;
  right: 10px;
  height: 25px;
  background-color: black;
  color: white;
  text-align: center;
}

@media (max-width: 991.98px) {
  .main-container {
    height: auto;
    margin-top: 10px;
  }
  .list-header {
    font-size: 28px;
    line-height: 32px;
  }
  .see-all-header {
    font-size: 14px;
    line-height: 12px;
  }
  .book-author-container {
    padding-top: 3px;
    font-size: 10px;
    line-height: 12px;
  }

  .discount-offer {
    top: 5px;
    right: 5px;
    height: 20px;
    font-size: 10px;
    line-height: 20px;
  }
}
</style>
