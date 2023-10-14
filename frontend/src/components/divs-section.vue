<template>
    <v-row
      style="
        background: linear-gradient(to right, white 50%, #f3f0e9 50%);
        height: auto;
        padding: 40px;
        padding-top: 30px;
        padding-bottom: 10px;
      "
    >
      <div style="font-size: 50px; font-weight: bold; color: #494949">
        In This Book
      </div>
    </v-row>
    <v-row
      style="
        background: linear-gradient(to right, white 50%, #f3f0e9 50%);
        height: auto;
        padding: 40px;
        padding-top: 0px;
      "
    >
      <v-row cols="12" sm="6" style="padding: 0px">
        <v-col
          v-for="index in 3"
          :key="index"
          cols="12"
          sm="4"
          style="
            padding: 0px;
            margin-top: 25px;
            display: flex;
            justify-content: center;
          "
        >
          <div
            style="
              box-sizing: border-box;
              position: relative;
              width: 357px;
              height: 239px;
              background: #fffdfd;
              border: 1px solid #000000;
              border-radius: 5px;
              margin: 10px auto;
              padding: 10px;
              padding-top: 35px;
            "
          >
            <div
              style="
                box-sizing: border-box;
                position: absolute;
                height: 60px;
                width: 60px;
                top: -25px;
                background: #fffdfd;
                border: 1px solid #000000;
                border-radius: 50%;
                display: flex;
                align-content: stretch;
                flex-direction: row;
                justify-content: center;
                align-items: center;
              "
            >
              <v-icon size="4.5rem" color="#000000" style="right: 1px"
                >mdi-numeric-{{ index }}</v-icon
              >
            </div>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised.
          </div>
        </v-col>
      </v-row>
    </v-row>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DivsSection",
  props: {},
  data() {
    return {
      // Add your data properties here
    };
  },
  watch: {
    // Add your watch properties here
  },
  computed: {
    // Add your computed properties here
  },
  methods: {
    // Add your methods here
  },
});
</script>
