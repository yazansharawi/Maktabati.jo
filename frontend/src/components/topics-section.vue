<template>
  <div>
        <v-row
      style="
        background-color: #f3f0e9;
        height: auto;
        padding: 40px;
        display: flex;
        justify-content: center;
        padding-bottom: 10px;
      "
    >
      <div style="font-size: 50px; font-weight: bold; color: #494949">
        Topics
      </div>
    </v-row>
    <v-row style="background-color: #f3f0e9">
      <v-col cols="12" sm="12" md="4">
        <div style="width: 100%; height: 100%; padding: 40px; padding-top: 0px">
          <img
            src="https://ucarecdn.com/472f5659-20c0-4135-be84-8b7534ed5c0c/ego1.png"
            alt="Book Image"
            style="width: 100%; height: 100%"
          />
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="4"
        style="display: flex; flex-direction: column; justify-self: auto"
        class="divsTopics"
      >
        <div
          v-for="item in divItems"
          :key="item.id"
          style="
            width: 90%;
            height: 84px;
            background: #fffdfd;
            border: 1px solid #000000;
            border-radius: 5px;
            display: flex;
            align-items: center;
            margin-bottom: 30px;
          "
        >
          <div
            style="
              font-size: 25px;
              font-weight: bold;
              color: #000000;
              padding-right: 10px;
              margin-left: 20px;
            "
          >
            {{ item.number }}
          </div>
          <div style="font-size: 25px; color: #000000">{{ item.text }}</div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="4"
        style="display: flex; flex-direction: column; justify-self: auto"
        class="divsTopics"
      >
        <div
          v-for="item in divItems"
          :key="item.id"
          style="
            width: 90%;
            height: 84px;
            background: #fffdfd;
            border: 1px solid #000000;
            border-radius: 5px;
            display: flex;
            align-items: center;
            margin-bottom: 30px;
          "
        >
          <div
            style="
              font-size: 25px;
              font-weight: bold;
              color: #000000;
              padding-right: 10px;
              margin-left: 20px;
            "
          >
            {{ item.number }}
          </div>
          <div style="font-size: 25px; color: #000000">{{ item.text }}</div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "topicsSection",
  data() {
    return {
      divItems: [
        { id: 1, number: "01", text: "The pitfalls of ego" },
        { id: 2, number: "02", text: "Another topic" },
        { id: 3, number: "03", text: "Yet another topic" },
      ],
    };
  },
};
</script>

<style scoped>
@media (max-width: 991.98px) {
  .divsTopics {
    padding-top: 0px;
    align-items: center;
  }
}
</style>
