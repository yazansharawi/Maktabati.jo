<template>
  <div>
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        padding: 15px;
        border: 1px solid #000000;
      "
    >
      <v-avatar
        image="https://ucarecdn.com/472f5659-20c0-4135-be84-8b7534ed5c0c/ego1.png"
        size="80"
      />
      <div style="font-size: 25px; font-weight: bold; color: #494949">
        Yazan Sharawi
      </div>
      <div style="display: flex; gap: 40px">
        <div style="display: flex; flex-direction: column; align-items: center">
          <div style="font-size: 20px; font-weight: bold; color: #494949">
            155
          </div>
          <div style="font-size: 15px; color: #494949">Followers</div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center">
          <div style="font-size: 20px; font-weight: bold; color: #494949">
            200
          </div>
          <div style="font-size: 15px; color: #494949">Following</div>
        </div>
      </div>
      <div>
        <v-btn prepend-icon="mdi-account-group" elevation="0" variant="outlined"
          >Manage my Netwrok</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserProfileCard",
  data() {
    return {};
  },
};
</script>

<style scoped></style>
