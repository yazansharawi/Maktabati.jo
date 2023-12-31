<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="400">
      <v-card>
        <v-card-text v-if="eventType == 'addedToCart'"
          >added to cart
        </v-card-text>
        <v-card-text v-else-if="eventType == 'rented'"> rented </v-card-text>
        <v-card-text v-else> error </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="closeDialog">Close Dialog</v-btn>
          <v-btn color="primary" block @click="closeDialog">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "EventDialog",
  props: {
    model: {
      type: Boolean,
      required: false,
      default: false,
    },
    typeOfEvent: {
      type: String,
      required: false,
      default: null,
    },
    eventType: {
      type: String,
      required: false,
      default: null,
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
  },
  methods: {
    closeDialog() {
      this.$emit("update:model", false);
    },
  },
};
</script>

<style scoped></style>
