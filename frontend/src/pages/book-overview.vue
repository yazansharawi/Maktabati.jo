<template>
  <div>
    <bookOverviewNavbarVue />
    <v-row>
      <!-- Left Side  -->
      <v-col cols="12" sm="6" style="padding: 0px">
        <div
          style="
            background-color: #f3f0e9;
            height: auto;
            padding: 40px;
            display: flex;
            flex-direction: column;
          "
        >
          <div style="margin-bottom: 20px">
            <v-icon size="2rem" color="#FFCB45">mdi-star</v-icon>
            <div
              style="
                display: inline-block;
                vertical-align: middle;
                margin-left: 5px;
                color: #494949;
                font-size: 21px;
                font-weight: bold;
              "
            >
              4.5
            </div>
          </div>
          <div style="font-size: 35px; font-weight: bold; color: #494949">
            “The world can show you the truth, but no one can force you to
            accept it.”
          </div>
          <div
            style="
              font-size: 20px;
              font-weight: bold;
              color: #494949;
              margin-top: 20px;
            "
          >
            A must read for those who seek success
          </div>
          <div
            style="display: inline-block; margin-top: 30px; margin-bottom: 50px"
          >
            <v-btn elevation="0" color="#4C6B8A" class="mr-10">
              <span style="color: white"> Read Demo</span>
            </v-btn>
            <v-btn elevation="0" color="#AE0000">
              <span style="color: white"> Buy Now</span>
            </v-btn>
          </div>
        </div>
      </v-col>
      <!-- Right Side -->
      <v-col cols="12" sm="6" style="text-align: center">
        <div style="width: 80%; height: 100%; position: relative; margin: auto">
          <img
            src="https://ucarecdn.com/472f5659-20c0-4135-be84-8b7534ed5c0c/ego1.png"
            alt="Your Image"
            style="
              width: 100%;
              height: 100%;
              object-fit: contain;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            "
          />
        </div>
      </v-col>
    </v-row>
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
        style="padding: 20px; display: flex; flex-direction: row"
      >
        <div style="flex: 1">
          <div style="font-size: 20px; color: #494949">Author</div>
          <div
            style="
              color: #494949;
              font-size: 20px;
              font-weight: bold;
              margin-top: 15px;
            "
          >
            - Ryan Holiday
          </div>
        </div>
        <div style="flex: 2">
          <div style="font-size: 20px; color: #494949">Badges</div>
          <div style="margin-top: 15px">
            <v-btn elevation="0" color="#AE0000" class="mr-1">
              <v-icon color="white" class="pr-1">mdi-emoticon</v-icon>
              <span style="color: white">People’s book</span>
            </v-btn>
            <v-btn elevation="0" color="#AE0000">
              <v-icon color="white" class="pr-2">mdi-rocket-launch</v-icon>
              <span style="color: white">Top Selling</span>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
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
      <v-col cols="4" sm="4">
        <div style="width: 100%; height: 100%; padding: 40px; padding-top: 0px">
          <img
            src="https://ucarecdn.com/472f5659-20c0-4135-be84-8b7534ed5c0c/ego1.png"
            alt="Book Image"
            style="width: 100%; height: 100%"
          />
        </div>
      </v-col>
      <v-col
        cols="4"
        sm="4"
        style="display: flex; flex-direction: column; justify-self: auto"
      >
        <div
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
            01
          </div>
          <div style="font-size: 25px; color: #000000">The pitfalls of ego</div>
        </div>
        <div
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
            01
          </div>
          <div style="font-size: 25px; color: #000000">The pitfalls of ego</div>
        </div>
        <div
          style="
            width: 90%;
            height: 84px;
            background: #fffdfd;
            border: 1px solid #000000;
            border-radius: 5px;
            display: flex;
            align-items: center;
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
            01
          </div>
          <div style="font-size: 25px; color: #000000">The pitfalls of ego</div>
        </div>
      </v-col>

      <v-col cols="4" sm="4">
        <div
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
            01
          </div>
          <div style="font-size: 25px; color: #000000">The pitfalls of ego</div>
        </div>
        <div
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
            01
          </div>
          <div style="font-size: 25px; color: #000000">The pitfalls of ego</div>
        </div>
        <div
          style="
            width: 90%;
            height: 84px;
            background: #fffdfd;
            border: 1px solid #000000;
            border-radius: 5px;
            display: flex;
            align-items: center;
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
            01
          </div>
          <div style="font-size: 25px; color: #000000">The pitfalls of ego</div>
        </div>
      </v-col>
    </v-row>
     <v-row style="background-color: white">
      <v-col cols="4" sm="4">
        <div style="width: 100%; height: 100%; padding: 40px; padding-top: 0px">
          <img
            src="https://ucarecdn.com/472f5659-20c0-4135-be84-8b7534ed5c0c/ego1.png"
            alt="Book Image"
            style="width: 100%; height: 100%"
          />
        </div>
      </v-col>
      <v-col
        cols="8"
        sm="4"
        style="display: flex; flex-direction: column; justify-self: auto"
      >
      <v-row>
          <div style="font-size: 50px; font-weight: bold; color: #494949">
        In This Book
      </div>
      </v-row>
      </v-col>
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
    </v-row>
    <Footer />
  </div>
</template>

<script>
import bookOverviewNavbarVue from "../components/Navs/book-overview-navbar.vue";
import Footer from "../components/Footer/footer.vue";
export default {
  name: "BookOverview",

  components: {
    bookOverviewNavbarVue,
    Footer
  },
};
</script>
<style></style>
