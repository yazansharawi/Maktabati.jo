<template>
  <div>
    <Nav />
    <v-container max-width="1500px" style="display: flex; gap: 20px">
      <!-- Left Col -->
      <div class="mostLeftCol">
        <UserPresonaCard />
        <div
          style="
            border: 1px solid #000000;
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            padding: 15px;
            gap: 10px;
          "
        >
          <div style="font-size: 20px; font-weight: bold; color: #494949">
            Filter Feed Based on
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px">
            <v-btn
              v-for="(button, index) in buttons"
              :key="index"
              elevation="0"
              style="justify-content: flex-start; padding-left: 0px"
            >
              <v-icon class="mr-2">{{ button.icon }}</v-icon> {{ button.label }}
            </v-btn>
          </div>
        </div>
      </div>
      <!-- Middle Col -->
      <div style="display: flex; flex: 1.4">
        <div style="width: 100%">
          <div
            style="
              padding: 10px;
              display: flex;
              border: 1px solid #000000;
              justify-content: center;
              align-items: center;
              margin-bottom: 10px;
            "
          >
            <v-avatar
              image="https://ucarecdn.com/472f5659-20c0-4135-be84-8b7534ed5c0c/ego1.png"
              size="50"
              class="mr-3"
            />
            <v-text-field
              placeholder="What's On your mind, Yazan ?"
              clearable
              variant="plain"
            />
          </div>
          <div
            v-if="isMobile"
            style="padding: 10px; padding-left: 0px; margin-top: 10px"
          >
            <div style="display: flex">
              <v-btn
                prepend-icon="mdi-filter"
                elevation="0"
                variant="outlined"
                class="mr-2"
              >
                Filter Based On
              </v-btn>
              <v-btn
                prepend-icon="mdi-emoticon-cool"
                elevation="0"
                variant="outlined"
                >Suggested Communities/People
              </v-btn>
            </div>
          </div>
          <div
            style="
              border: 1px solid rgb(0, 0, 0);
              margin-top: 10px;
              padding: 10px;
            "
          >
            <div style="justify-content: space-between; display: flex">
              <div
                style="
                  display: flex;
                  align-items: center;
                  align-items: flex-start;
                "
              >
                <v-avatar
                  image="https://ucarecdn.com/472f5659-20c0-4135-be84-8b7534ed5c0c/ego1.png"
                  size="50"
                  class="mr-3"
                />
                <div>
                  <div>Yazan Sharawi</div>
                  <div>2 hours ago</div>
                </div>
              </div>
              <div style="display: flex">
                <v-icon size="1.7rem" color="#494949">mdi-dots-vertical</v-icon>
              </div>
            </div>
            <hr style="width: 100%" />
            <div style="display: flex; min-height: 60px">fdsf</div>
            <div style="display: flex; justify-content: space-between">
              <div style="display: flex; gap: 50px">
                <div style="display: flex; align-items: center">
                  <div>
                    <v-icon size="1.2rem" color="#494949" class="mr-2"
                      >mdi-thumb-up</v-icon
                    >
                  </div>
                  <div style="font-size: 1.2rem">300</div>
                </div>
                <div style="display: flex; align-items: center">
                  <div>
                    <v-icon size="1.2rem" color="#494949" class="mr-2"
                      >mdi-thumb-down</v-icon
                    >
                  </div>
                  <div style="font-size: 1.2rem">300</div>
                </div>
                <div style="display: flex; align-items: center">
                  <div>
                    <v-icon size="1.2rem" color="#494949" class="mr-2"
                      >mdi-comment</v-icon
                    >
                  </div>
                  <div style="font-size: 1.2rem">300</div>
                </div>
              </div>
              <div style="display: flex">
                <v-icon size="1.5rem" color="#494949">mdi-content-save</v-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Right Col -->
      <div class="mostRightCol">
        <suggestionsToFollowCard />
        <suggestionsPeopleToFollowCard />
      </div>
    </v-container>
  </div>
</template>

<script>
import Nav from "../components/Navs/main-navbar.vue";
import suggestionsToFollowCard from "../components/suggestions-Communities-to-follow-card.vue";
import suggestionsPeopleToFollowCard from "../components/suggestions-people-to-follow-card.vue";
import UserPresonaCard from "../components/user-profile-card.vue";
export default {
  name: "CommunityPage",
  data() {
    return {
      isMobile: false,
      buttons: [
        { label: "Best", icon: "mdi-rocket" },
        { label: "Hot", icon: "mdi-fire" },
        { label: "New", icon: "mdi-new-box" },
        { label: "Top", icon: "mdi-arrow-up" },
        { label: "Rising", icon: "mdi-swap-vertical" },
      ],
    };
  },
  components: {
    Nav,
    UserPresonaCard,
    suggestionsToFollowCard,
    suggestionsPeopleToFollowCard,
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 991.98;
    },
  },
};
</script>

<style scoped>
.mostRightCol,
.mostLeftCol {
  display: flex;
  flex: 0.6;
  flex-direction: column;
}
@media (min-width: 1280px) {
  .v-container {
    max-width: 1268px;
  }
}
@media (max-width: 991.98px) {
  .mostLeftCol,
  .mostRightCol {
    display: none;
  }
}
</style>
