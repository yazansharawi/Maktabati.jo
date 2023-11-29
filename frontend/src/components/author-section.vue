<template>
  <div>
    <v-row style="background-color: white">
      <v-col cols="12" sm="12" md="4">
        <div style="text-align: center">
          <div
            style="
              width: 100%;
              height: 100%;
              padding: 40px;
              padding-top: 0px;
              display: inline-block;
            "
          >
            <img
              :src="authorImg"
              alt="Book Image"
              style="width: 100%; height: auto; max-height: 500px"
              class="authorImg"
            />
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="8"
        style="display: flex; flex-direction: column"
        class="authorInfo"
      >
        <div style="font-size: 50px; font-weight: bold; color: #494949">
          {{ authorName ? authorName : "no name" }}
        </div>
        <div>
          {{ authorBio ? authorBio : "no bio" }}
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "authorSection",
  props: {
    authorImg: {
      type: String,
      required: false,
      default: null,
    },
    authorName: {
      type: String,
      required: false,
      default: null,
    },
    authorBio: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped>
@media (max-width: 991.98px) {
  .authorInfo {
    padding-top: 0px;
    text-align: center;
    padding-bottom: 30px;
  }
  .authorImg {
    max-height: 300px;
  }
}
</style>
