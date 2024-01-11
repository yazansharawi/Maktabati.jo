<template>
  <div>
    <v-row
      :style="{
        background: backgroundColor,
        height: 'auto',
        padding: '40px',
        paddingTop: '30px',
        paddingBottom: '10px',
      }"
      class="sectionName"
    >
      <div style="font-size: 50px; font-weight: bold; color: #494949">
        {{ sectionName }}
      </div>
    </v-row>
    <v-row
      :style="{
        background: backgroundColor,
        height: 'auto',
        padding: '40px',
        paddingTop: '0px',
      }"
    >
      <v-row cols="12" sm="6" style="padding: 0px">
        <v-col
          v-for="(item, index) in data"
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
          <div :style="style(sectionName)">
            <div
              style="
                box-sizing: border-box;
                position: absolute;
                height: 58px;
                width: 58px;
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
              <div>
                <div v-if="sectionName === 'Reviews'">
                  <v-avatar size="large">
                    <v-icon
                      size="3rem"
                      color="#ae0000"
                      style="padding-top: 15px"
                    >
                      mdi-account
                    </v-icon></v-avatar
                  >
                </div>
                <div v-else>
                  <v-icon size="4.5rem" color="#000000" style="right: 1px">
                    mdi-numeric-{{ index + 1 }}
                  </v-icon>
                </div>
              </div>
            </div>
            <div style="display: flex; align-items: center">
              {{ item.description ? item.description : item.comment }}
            </div>
          </div>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "DivSection",
  computed: {
    style() {
      return function (sectionName) {
        if (sectionName === "Reviews") {
          return {
            boxSizing: "border-box",
            position: "relative",
            width: "357px",
            height: "150px",
            background: "#fffdfd",
            border: "1px solid #000000",
            borderRadius: "5px",
            margin: "10px auto",
            padding: "10px",
            paddingTop: "35px",
            display: "flex",
            "justify-content": "center",
          };
        } else {
          return {
            boxSizing: "border-box",
            position: "relative",
            width: "357px",
            height: "auto",
            background: "#fffdfd",
            border: "1px solid #000000",
            borderRadius: "5px",
            margin: "10px auto",
            padding: "10px",
            paddingTop: "35px",
          };
        }
      };
    },
  },
  props: {
    sectionName: {
      type: String,
      required: false,
      default: "",
    },
    backgroundColor: {
      type: String,
      required: false,
      default: "",
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
      required: false,
    },
  },
};
</script>

<style scoped>
@media (max-width: 991.98px) {
  .sectionName {
    justify-content: center;
  }
}
</style>
