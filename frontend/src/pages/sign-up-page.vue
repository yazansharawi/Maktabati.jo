<template>
  <div style="background-color: #f3f0e9;" id="all">
    <div style="display: flex;">
      <div class="left" style="display: flex; flex: 1.5; align-items: center">
        <v-sheet width="400" class="mx-auto" style="border-radius: 20px;">
          <h1 class="welcome">Welcome Back!</h1>
          <v-form class="pa-10" fast-fail @submit.prevent="login">
            <div style="display: flex; justify-content: space-between;">
              <div style="width: 48%;">
                <v-text-field
                  variant="outlined"
                  label="First Name"
                  v-model="firstName"
                  prepend-inner-icon="mdi-account-outline"
                ></v-text-field>
              </div>
              <div style="width: 48%;">
                <v-text-field
                  variant="outlined"
                  label="Last Name"
                  v-model="lastName"
                  prepend-inner-icon="mdi-account-outline"
                ></v-text-field>
              </div>
            </div>
            <v-text-field
              variant="outlined"
              label="Email"
              v-model="email"
              prepend-inner-icon="mdi-email-outline"
            ></v-text-field>
            <v-text-field
              variant="outlined"
              v-model="password"
              label="Password"
              prepend-inner-icon="mdi-lock-outline"
            ></v-text-field>

            <div class="questionOptions">
              <v-btn
                v-for="(option, index) in bookTypeOptions"
                :key="index"
                elevation="0"
                @click="toggleBookTypeOption(index)"
                :class="{
                  'rounded-option': true,
                  'selected-option': selectedBookTypeOption === index,
                }"
              >
                {{ option }}
              </v-btn>
            </div>

            <div style="width: 50%; display:flex">
              <v-btn style="display: flex; flex: 1;" type="submit" color="#8E0000" block class="mt-2"
              ><p class="white">Sign up</p></v-btn
            >
            <v-btn style=" display: flex; flex: 1; position:relative; left:10px" type="submit" color="#808080" block class="mt-2"
              ><p class="white">Sign in</p></v-btn
            > 
            </div>
          </v-form>
        </v-sheet>
      </div>
      <div class="right">
        <img style="height:640px;width:auto" src="https://ucarecdn.com/f9f58be2-9e38-4b8e-9583-d7822e68d737/" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupPage",
  components: {},
  data() {
    return {
      introDiv: true,
      firstQuestionDiv: false,
      currentStep: 0,
      totalSteps: 4,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      bookTypeOptions: ["Customer", "Seller"],
      selectedBookTypeOption: null,
    };
  },
  methods: {
    goToNextStep() {
      this.currentStep++;
    },
    goToPrevStep() {
      this.currentStep--;
    },
    toggleBookTypeOption(index) {
      if (this.selectedBookTypeOption === index) {
        this.selectedBookTypeOption = null;
      } else {
        this.selectedBookTypeOption = index;
      }
    },
    finishQuestionnaire() {
      console.log("Questionnaire completed!");
    },
    login() {
      // Add your login functionality here
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
.questionOptions {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  padding-top: 20px;
  justify-content: center;
}
.white{
  color:white;
  position:relative;
  top:8px;
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
  background-color: #8e0000;
  border-radius: 10px;
  border: 1px solid black;
  color: white;
}
.welcome{
  position: relative;
  left: 65px;
  top: 10px;
}
@media screen and (max-width: 767px) {
  .right {
    display: none;
  }

  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .left {
    width: 90%; /* Reduced width for smaller screens */
    max-width: 320px; /* Maximum width for smaller screens */
    padding: 20px;
    box-sizing: border-box;
  }
}



</style>
