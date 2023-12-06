<template>
  <div class="main-div">
    <Nav :isGetUserPage="true" />
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: getProgressBarWidth }" />
    </div>
    <div v-if="introDiv" class="welcome-div">
      <p class="firstHeader welcome-animation">
        Welcome
        <span style="color:#AE0000">{{
          $store.getters.user.firstName + " " + $store.getters.user.lastName
        }}</span>, So happy that you are here with us!
      </p>
      <p class="secHeader welcome-animation">
        Before you go and explore the world of Maktabti, we would like to get to
        know you better!
      </p>
      <div class="letsStartDiv welcome-animation">
        <v-btn
          elevation="0"
          class="rounded-btn"
          @click="
            introDiv = false;
            firstQuestionDiv = true;
            currentStep = 1;
          "
        >
          Let's Start
        </v-btn>
      </div>
    </div>
    <div class="divQuestion" v-if="firstQuestionDiv">
      <div class="divQuestionHeader">{{ $questions[currentStep - 1] }}</div>
      <div class="questionHint">(You can choose multiple options)</div>
      <div class="questionOptions" v-if="currentStep === 1">
        <v-btn
          v-for="(option, index) in $genreOptions"
          :key="index"
          elevation="0"
          @click="toggleGenreOption(option)"
          :class="{
            'rounded-option': true,
            'selected-option': selectedGenreOptions.includes(option),
          }"
        >
          {{ option }}
        </v-btn>
      </div>
      <div class="questionOptions" v-else-if="currentStep === 2">
        <v-btn
          v-for="(option, index) in $authorOptions"
          :key="index"
          elevation="0"
          @click="toggleAuthorOption(option)"
          :class="{
            'rounded-option': true,
            'selected-option': selectedAuthorOptions.includes(option),
          }"
        >
          {{ option }}
        </v-btn>
      </div>
      <div class="questionOptions mobile" v-else-if="currentStep === 3">
        <v-btn
          v-for="(option, index) in $bookTypeOptions"
          :key="index"
          elevation="0"
          @click="BookTypeOption(option)"
          :class="{
            'rounded-option': true,
            'selected-option': selectedBookTypeOptions.includes(option),
          }"
        >
          {{ option }}
        </v-btn>
      </div>
      <div class="questionOptions mobile" v-else-if="currentStep === 4">
        <v-btn
          v-for="(option, index) in $bookAgeOptions"
          :key="index"
          elevation="0"
          @click="bookAgeOptions(option)"
          :class="{
            'rounded-option': true,
            'selected-option': selectedbookAgeOptions.includes(option),
          }"
        >
          {{ option }}
        </v-btn>
      </div>
    </div>
    <div v-if="firstQuestionDiv" class="question-btn-container">
      <v-btn
        v-if="currentStep > 1"
        elevation="0"
        @click="goToPrevStep"
        class="prev-question-btn"
      >
        Previous Question
      </v-btn>
      <v-btn
        v-if="currentStep < totalSteps && currentStep !== 4"
        elevation="0"
        @click="goToNextStep"
      >
        Next Question
      </v-btn>
      <v-btn
        v-if="currentStep === 4"
        elevation="0"
        @click="finishQuestionnaire"
      >
        Finish
      </v-btn>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Navs/main-navbar.vue";
export default {
  name: "GetToKnowUser",
  components: {
    Nav,
  },
  data() {
    return {
      introDiv: true,
      firstQuestionDiv: false,
      currentStep: 0,
      totalSteps: 4,
      selectedGenreOptions: [],
      selectedAuthorOptions: [],
      selectedBookTypeOptions: [],
      selectedbookAgeOptions: [],
      userFirstName: null,
      userLastName: null,
    };
  },
  methods: {
    goToNextStep() {
      this.currentStep++;
    },
    goToPrevStep() {
      this.currentStep--;
    },
    toggleGenreOption(option) {
      if (this.selectedGenreOptions.includes(option)) {
        this.selectedGenreOptions = this.selectedGenreOptions.filter(
          (item) => item !== option
        );
      } else {
        this.selectedGenreOptions.push(option);
      }
    },
    BookTypeOption(option) {
      if (this.selectedBookTypeOptions.includes(option)) {
        this.selectedBookTypeOptions = this.selectedBookTypeOptions.filter(
          (item) => item !== option
        );
      } else {
        this.selectedBookTypeOptions.push(option);
      }
    },
    toggleAuthorOption(option) {
      if (this.selectedAuthorOptions.includes(option)) {
        this.selectedAuthorOptions = this.selectedAuthorOptions.filter(
          (item) => item !== option
        );
      } else {
        this.selectedAuthorOptions.push(option);
      }
    },
    bookAgeOptions(option) {
      if (this.selectedbookAgeOptions.includes(option)) {
        this.selectedbookAgeOptions = this.selectedbookAgeOptions.filter(
          (item) => item !== option
        );
      } else {
        this.selectedbookAgeOptions.push(option);
      }
    },

    finishQuestionnaire() {
      try {
        let data = {
          userFavoriteGenres: this.selectedGenreOptions,
          userFavoriteAuthors: this.selectedAuthorOptions,
          userFavoriteBookType: this.selectedBookTypeOptions,
          userFavoriteBookAge: this.selectedbookAgeOptions,
        };
        this.$axios
          .put("user/user-preferences/" + this.$store.getters.user.uuid, data)
          .then(async (response) => {
            if (response.status == 200) {
              this.$router.push({ name: "HomePage" });
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      } catch (er) {
        console.log(er);
      }
    },
  },
  computed: {
    getProgressBarWidth() {
      return `${(this.currentStep / this.totalSteps) * 100}%`;
    },
  },
};
</script>

<style scoped>
.main-div {
  background-color: #f3f0e9;
  font-weight: 700;
  text-align: center;
  color: #494949;
  height: 100vh;
}
.firstHeader {
  padding-top: 130px;
  font-size: 30px;
}
.secHeader {
  padding-top: 25px;
  font-size: 25px;
}
.letsStartDiv {
  padding-top: 25px;
}
.rounded-btn {
  background-color: #ae0000;
  width: 170px;
  height: 50px;
  color: white;
  border-radius: 20px;
}
@keyframes fadeInAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.question-btn-container {
  flex-direction: column;
  padding-top: 40px;
}
.welcome-animation {
  animation: fadeInAnimation 1s ease-in-out;
  animation-fill-mode: both;
}
.progress-bar-container {
  padding: 0px;
  width: 100%;
  height: 10px;
  background-color: #f3f0e9;
}

.progress-bar {
  height: 100%;
  background-color: #ae0000;
  transition: width 0.3s ease-in-out;
}
.divQuestion {
  height: auto;
  display: flex;
  flex-direction: column;
}
.divQuestionHeader {
  padding-top: 20px;
  font-size: 35px;
  font-weight: 700;
  color: #494949;
}
.questionOptions {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  padding-top: 20px;
  justify-content: center;
}

.rounded-option {
  background-color: white;
  color: black;
  border-radius: 10px;
  border: 1px solid black;
  font-size: 14px;
  cursor: pointer;
}

.selected-option {
  background-color: red;
  border-radius: 10px;
  border: 1px solid black;
  color: white;
}

.selected-option {
  background-color: #ae0000;
  color: White;
}
.questionHint {
  padding-top: 15px;
  font-size: 14px;
  color: #494949;
  padding-bottom: 5px;
}
.prev-question-btn {
  margin-right: 20px;
}

@media (max-width: 992px) {
  .mobile {
    height: 100vh;
  }
  .main-div {
    background-color: #f3f0e9;
    font-weight: 700;
    text-align: center;
    color: #494949;
    height: auto;
  }
  .welcome-div {
    padding: 30px;
    height: 100vh;
  }
  .firstHeader {
    padding-top: 130px;
    font-size: 30px;
  }
  .secHeader {
    padding-top: 20px;
    font-size: 20px;
  }
  .question-btn-container {
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .progress-bar {
    transition: width 0.6s ease-in-out;
  }
  .divQuestionHeader {
    padding-top: 60px;
  }
}
</style>
