<template>
  <div>
    <v-row
      style="
        padding: 20px;
        background-color: #f3f0e9;
        height: auto;
        position: relative;
      "
    >
      <v-col
        cols="12"
        sm="6"
        style="
          padding: 20px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        "
      >
        <div style="flex: 1" class="bookInfo">
          <div style="font-size: 20px; color: #494949">Author</div>
          <div
            style="
              color: #494949;
              font-size: 20px;
              font-weight: bold;
              margin-top: 15px;
            "
          >
            - {{ authorName }}
          </div>
        </div>
        <div style="flex: 1" class="bookInfo">
          <div style="font-size: 20px; color: #494949">Badges</div>
          <div style="margin-top: 15px; display: flex" class="btn-col">
            <v-btn
              v-for="(index, badgeIndex) in numberOfBadges"
              :key="index"
              elevation="0"
              color="#AE0000"
              class="btn mr-1"
            >
              <v-icon color="white" class="pr-1"
                >mdi-{{ badgeIcons[badgeIndex] }}</v-icon
              >
              <span style="color: white">{{ badgeTexts[badgeIndex] }}</span>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "BookInfo",
  props: {
    authorName: {
      type: String,
      required: false,
      default: null,
    },
    badgeIcons: {
      type: Array,
      required: false,
      default: null,
    },
    badgeTexts: {
      type: Array,
      required: false,
      default: null,
    },
    numberOfBadges: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  methods: {},
};
</script>

<style scoped>
@media (max-width: 991.98px) {
  .bookInfo {
    flex: 1;
    text-align: center;
    justify-content: center;
  }
  .btn {
    margin-bottom: 10px;
  }
  .btn-col {
    flex-direction: column;
  }
}
</style>
