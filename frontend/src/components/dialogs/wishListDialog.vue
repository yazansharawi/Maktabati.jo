<template>
  <div class="text-center">
    <v-dialog width="500" v-model="dialog">
      <template v-slot:default="{ isActive }">
        <v-card title="My Wishlist" class="main">
          <v-card-text class="info">
            <div
              v-for="(book, index) in this.$wishListPerUserBookInfo"
              :key="index"
              class="divInfo"
            >
              <div style="width: 100%; height: 100%">
                <div class="imgTitle">
                  <router-link
                    :to="{
                      name: 'BookOverView',
                      params: { id: book.id },
                    }"
                    style="text-decoration: none; color: inherit; width: 50%"
                  >
                    <img
                      :src="book.image"
                      alt="Book Image"
                      style="width: 60%; height: 100%"
                    />
                  </router-link>
                  <div class="bookInfo">
                    <div>{{ book.title }}</div>
                    <div>{{ book.language }}</div>
                    <div>{{ book.genre }}</div>
                  </div>
                </div>
              </div>
              <div>
                <v-btn
                  rounded
                  elevation="0"
                  color="#AE0000"
                  @click="deleteBookFromWishList(book.id)"
                >
                  delete</v-btn
                >
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "myRentedBooksDialog",
  props: {
    model: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  created() {},
  computed: {
    dialog: {
      get() {
        return this.model;
      },
      set(value) {
        this.$emit("update:model", value);
      },
    },
  },
  methods: {
    closeDialog() {
      this.$emit("update:model", false);
    },
    deleteBookFromWishList(id) {
      this.$axios
        .delete(`wish-list/delete-wishlist-by-book-id/${id}`)
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error("Error deleting book:", error);
        });
    },
  },
};
</script>

<style scoped>
.main {
  background-color: #f3f0e9;
}
.divInfo {
  display: flex;
}
.imgTitle {
  display: flex;
  gap: 10px;
}
.bookInfo {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
