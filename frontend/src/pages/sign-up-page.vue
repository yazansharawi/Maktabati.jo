<template>
  <div class="body">
    <h1 class="title"><strong>Maktabti.Jo</strong></h1>
    <div class="right">
      <img src="https://ucarecdn.com/f9f58be2-9e38-4b8e-9583-d7822e68d737/" />
    </div>
    <div id="login-form-wrap">
      <h2>Create an Account</h2>
      <form id="login-form">
        <p>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Email Address"
            required
          /><i class="validation"><span></span><span></span></i>
        </p>
        <p>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Password"
            required
          /><i class="validation"><span></span><span></span></i>
        </p>
        <p>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Confirm Password"
            required
          /><i class="validation"><span></span><span></span></i>
        </p>
        <div class="questionOptions">
          <v-btn
            v-for="(option, index) in bookTypeOptions"
            :key="index"
            elevation="0"
            @click="toggleAuthorOption(index)"
            :class="{
              'rounded-option': true,
              'selected-option': selectedAuthorOptions.includes(index),
            }"
          >
            {{ option }}
          </v-btn>
        </div>

        <p>
          By creating an account you agree to our
          <a href="#">Terms & Privacy</a>.
        </p>
        <p>
          <input type="submit" id="login" value="Login" />
        </p>
      </form>
      <div class="create-account-wrap">
        <p>Already have an account? <a href="#">Log in</a></p>
      </div>
      <!--create-account-wrap-->
    </div>
    <!--login-form-wrap-->
    <!-- partial -->
  </div>
</template>

<script>
export default {
  name: "SignupPage",
  components: {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.title {
  float: left;
  position: relative;
  left: 50px;
  top: 20px;
}
body {
  background: #f3f0e9;
  font-size: 1.6rem;
  font-family: "Times New Roman", Times, serif;
  color: #2b3e51;
}
h2 {
  font-weight: 300;
  text-align: center;
}

p {
  position: relative;
}
img {
  height: 640px;
  width: auto;
}
.right {
  float: right;
}
#login-form-wrap {
  background-color: #fff;
  width: 35%;
  margin: 30px auto;
  text-align: center;
  padding: 20px 0 0 0;
  border-radius: 50px;
  box-shadow: 0px 30px 50px 0px rgba(0, 0, 0, 0.2);
  float: left;
  position: relative;
  left: 50px;
  top: 40px;
}

#login-form {
  padding: 0 60px;
}

input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  outline: none;
  height: 60px;
  line-height: 60px;
  border-radius: 4px;
}
select {
  width: 100%;
  height: 100%;
  padding: 0 0 0 10px;
  margin: 0;
  color: #8a8b8e;
  border: 1px solid #c2c0ca;
  font-style: normal;
  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  display: inline-block;
  background: none;
}
input[type="text"],
input[type="email"] {
  width: 100%;
  padding: 0 0 0 10px;
  margin: 0;
  color: #8a8b8e;
  border: 1px solid #c2c0ca;
  font-style: normal;
  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  display: inline-block;
  background: none;
}
input[type="text"]:focus,
input[type="email"]:focus {
  border-color: #3ca9e2;
}
input[type="text"]:focus:invalid,
input[type="email"]:focus:invalid {
  color: #cc1e2b;
  border-color: #cc1e2b;
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
input[type="text"]:valid ~ .validation,
input[type="email"]:valid ~ .validation {
  display: block;
  border-color: #0c0;
}
input[type="text"]:valid ~ .validation span,
input[type="email"]:valid ~ .validation span {
  background: #0c0;
  position: absolute;
  border-radius: 6px;
}
input[type="text"]:valid ~ .validation span:first-child,
input[type="email"]:valid ~ .validation span:first-child {
  top: 30px;
  left: 14px;
  width: 20px;
  height: 3px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
input[type="text"]:valid ~ .validation span:last-child,
input[type="email"]:valid ~ .validation span:last-child {
  top: 35px;
  left: 8px;
  width: 11px;
  height: 3px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.validation {
  display: none;
  position: absolute;
  content: " ";
  height: 60px;
  width: 30px;
  right: 15px;
  top: 0px;
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

input[type="submit"] {
  border: none;
  display: block;
  background-color: #8e0000;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  font-size: 18px;
  position: relative;
  display: inline-block;
  cursor: pointer;
  text-align: center;
}
input[type="submit"]:hover {
  background-color: #329dd5;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.create-account-wrap {
  background-color: #eeedf1;
  color: #8a8b8e;
  font-size: 14px;
  width: 100%;
  padding: 10px 0;
  border-radius: 0 0 50px 50px;
}
</style>
