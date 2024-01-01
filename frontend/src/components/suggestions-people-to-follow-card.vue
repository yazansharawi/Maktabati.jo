<template>
  <div>
    <div
      style="
        display: flex;
        border: 1px solid #000000;
        flex-direction: column;
        gap: 10px;
        padding-bottom: 20px;
        margin-top: 20px;
      "
    >
      <div
        style="
          font-size: 17.5px;
          color: #494949;
          padding: 15px;
          padding-top: 7px;
          padding-bottom: 0px;
        "
      >
        Suggested People to follow
      </div>
      <div
        v-for="(item, index) in items"
        :key="index"
        style="
          display: flex;
          align-items: center;
          margin-top: 10px;
          padding-left: 15px;
          gap: 40px;
        "
      >
        <div style="display: flex; gap: 10px">
          <v-avatar :image="item.image" size="45" />
          <div>
            <div style="font-size: 15px; font-weight: bold; color: #494949">
              {{ item.name }}
            </div>
            <div style="font-size: 13px; color: #494949">
              {{ item.title }}
            </div>
          </div>
        </div>
        <div
          style="
            display: flex;
            border: 1px solid #494949;
            height: 40px;
            width: 40px;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
          "
        >
          <v-btn density="compact" icon="mdi-plus" elevation="0"></v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SuggestionsPeopleToFollowCard",
  data() {
    return {
      items: [
        {
          image:
            "https://ucarecdn.com/472f5659-20c0-4135-be84-8b7534ed5c0c/ego1.png",
          name: "Yazan Sharawi",
          title: "Creator",
        },
        {
          image:
            "https://ucarecdn.com/472f5659-20c0-4135-be84-8b7534ed5c0c/ego1.png",
          name: "Yazan Sharawi",
          title: "Creator",
        },
        {
          image:
            "https://ucarecdn.com/472f5659-20c0-4135-be84-8b7534ed5c0c/ego1.png",
          name: "Yazan Sharawi",
          title: "Creator",
        },
        {
          image:
            "https://ucarecdn.com/472f5659-20c0-4135-be84-8b7534ed5c0c/ego1.png",
          name: "Yazan Sharawi",
          title: "Creator",
        },
        {
          image:
            "https://ucarecdn.com/472f5659-20c0-4135-be84-8b7534ed5c0c/ego1.png",
          name: "Yazan Sharawi",
          title: "Creator",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
