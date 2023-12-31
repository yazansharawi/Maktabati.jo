<template>
  <div class="text-center">
    <v-dialog width="500" v-model="dialog">
      <template v-slot:default="{ isActive }">
        <v-card title="My Shopping Cart" class="main">
          <v-card-text class="info">
            <div
              v-for="(book, index) in this.$userShoppingCartInfo"
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
                    <div>{{ book.price }}</div>
                  </div>
                </div>
              </div>
              <div>
                <v-btn
                  rounded
                  elevation="0"
                  color="#AE0000"
                  @click="removeFromShoppingList(book.id)"
                >
                  delete</v-btn
                >
              </div>
            </div>
          </v-card-text>
          <v-divider class="my-3"></v-divider>
          <div class="total mx-3">Total: ${{ totalPrice.toFixed(2) }}</div>
          <v-divider class="my-3"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text="Checkout"
              @click="(isActive.value = false), (this.checkoutDialog = true)"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <v-dialog width="500" v-model="checkoutDialog">
      <v-card title="Checkout Confirmation" class="main">
        <v-card-text>
          <v-text-field
            v-model="userAddress"
            density="compact"
            placeholder="building number 6"
            label="Enter your Address"
            :rules="[() => !!userAddress || 'This field is required']"
            variant="outlined"
            required
            class="mt-3"
          />
          <v-select
            v-model="paymentMethod"
            required
            :items="items"
            density="compact"
            variant="outlined"
            label="Payment Method"
            :rules="[() => !!paymentMethod || 'This field is required']"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Confirm Order" @click="confirmOrder()"></v-btn>
          <v-btn text="Cancel" @click="checkoutDialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "shoppingCartDialog",

  data() {
    return {
      checkoutDialog: false,
      userAddress: null,
      paymentMethod: null,
      items: ["cash"],
    };
  },
  props: {
    model: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    dialog: {
      get() {
        return this.model;
      },
      set(value) {
        this.$emit("update:model", value);
      },
    },
    totalPrice() {
      return this.$userShoppingCartInfo.reduce(
        (total, book) => total + book.price,
        0
      );
    },
  },
  methods: {
    closeDialog() {
      this.$emit("update:model", false);
    },
    removeFromShoppingList(id) {
      let data = {
        bookId: id,
      };
      this.$axios
        .delete(
          `shopping-cart/delete-from-shop-cart-by-user-uuid/${this.$store.getters.user.uuid}`,
          { data }
        )
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    confirmOrder() {
      let storeIds = this.$userShoppingCartInfo.map((record) => record.storeId);

      let data = {
        bookIds: this.$userShoppingCart,
        storeIds: storeIds,
        userAddress: this.userAddress,
        paymentMethod: this.paymentMethod,
      };
      this.$axios
        .post(
          `purchase/create-new-purchase-by-user-uuid/${this.$store.getters.user.uuid}`,
          data
        )
        .then(async () => {
          this.checkoutDialog = false;
          this.userAddress = null;
          this.paymentMethod = null;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
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
.total {
  display: flex;
  flex-direction: row-reverse;
}
</style>
