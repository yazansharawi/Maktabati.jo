<template>
  <div class="text-center">
    <v-dialog
      transition="dialog-bottom-transition"
      width="500"
      v-model="dialog"
    >
      <v-card class="dialogStyle">
        <v-card-text>
          <div v-if="!termsAccepted">
            <div class="rentBookHeader">Terms and Conditions</div>
            <div class="conditionsText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              fugit inventore necessitatibus quasi culpa quae laboriosam, id
              temporibus, corporis tempore, aspernatur facere. Ut iure eius
              temporibus neque, autem porro placeat.
            </div>
            <div class="conditionsText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              fugit inventore necessitatibus quasi culpa quae laboriosam, id
              temporibus, corporis tempore, aspernatur facere. Ut iure eius
              temporibus neque, autem porro placeat.
            </div>
          </div>
          <div v-else>
            <div class="rentBookHeader">Choose A suitable Date</div>
            <div class="conditionsText">
              <v-text-field
                v-model="startDate"
                density="compact"
                placeholder="MM-DD-YY"
                label="Enter your Start Date"
                :rules="[
                  () => !!startDate || 'This field is required',
                  (v) =>
                    /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/.test(
                      v
                    ) || 'Date must be in MM-DD-YYYY format',
                ]"
                variant="outlined"
                required
              />
              <v-text-field
                v-model="endDate"
                density="compact"
                placeholder="MM-DD-YY"
                label="Enter your End Date"
                :rules="[
                  () => !!endDate || 'This field is required',
                  (v) =>
                    /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/.test(
                      v
                    ) || 'Date must be in MM-DD-YYYY format',
                ]"
                variant="outlined"
                required
              />
              <div style="font-size: 12px">
                The longest period for renting is 30 days other than is not
                allowed
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn v-if="!termsAccepted" variant="text" @click="acceptTerms"
            >Accept</v-btn
          >
          <v-btn
            v-else
            variant="text"
            @click="rentBook()"
            :disabled="!isDateRangeValid"
            >Rent it !</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "SearchEventDialog",
  props: {
    model: {
      type: Boolean,
      required: false,
      default: false,
    },
    bookInfo: {
      type: Object,
      required: false,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      termsAccepted: false,
      endDate: null,
      startDate: null,
      maxDateDiff: 30,
    };
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
    isDateRangeValid() {
      if (!this.startDate || !this.endDate) {
        return false;
      }
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= this.maxDateDiff;
    },
  },
  methods: {
    acceptTerms() {
      this.termsAccepted = true;
    },
    closeDialog() {
      this.$emit("update:model", false);
      this.termsAccepted = false;
    },
    rentBook() {
      let data = {
        bookId: this.bookInfo.id,
        endDate: this.endDate,
        startDate: this.startDate,
        storeId: this.bookInfo.storeId,
      };
      this.$axios
        .post(
          `rent-book/rent-book-by-user-uuid/${this.$store.getters.user.uuid}`,
          data
        )
        .then(async () => {
          this.dialog = false;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>

<style scoped>
.dialogStyle {
  background-color: #f6f6f6;
  color: #494949;
}
.rentBookHeader {
  font-size: 30px;
  color: #494949;
  margin-bottom: 10px;
}
.conditionsText {
  font-size: 15px;
}
</style>
