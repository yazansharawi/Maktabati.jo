<template>
  <div>
    <div class="main-container">
      <div class="headers-container">
        <div class="list-header">Get to know The Authors</div>
        <div class="see-all-header">See all</div>
      </div>
      <div class="authors-div">
        <div
          v-for="(author, index) in authors"
          :key="index"
          style="display: flex; flex: 1; justify-content: center"
        >
          <div class="author-info">
            <div class="all">
              <div class="author-img">
                <img :src="author.image" />
              </div>
              <div style="display: flex; flex: 1.5">
                <div class="author-image-text">
                  <div
                    style="
                      display: flex;
                      justify-content: center;
                      font-style: normal;
                      font-weight: 700;
                      font-size: 30px;
                      line-height: 34px;
                      color: #000000;
                    "
                  >
                    {{ author.name }}
                  </div>
                  <div
                    style="
                      display: flex;
                      font-style: normal;
                      font-weight: 700;
                      font-size: 15px;
                      color: gray;
                      margin-top: 20px;
                    "
                  >
                    {{ author.shortBrief }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthorList",
  components: {},
  props: {
    authors: {
      type: Object,
      requierd: false,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.author-img {
  display: flex;
  flex: 0.5;
}
img {
  width: 300px;
  height: 100%;
}
.all {
  display: flex;
}
.author-image-text {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.author-info {
  display: flex;
  width: 650px;
  height: 450px;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin: 0 -10px;
  border: 1px solid #000000;
  border-radius: 5px;
}
.authors-div {
  display: flex;
  flex-direction: row;
  gap: 30px;
  padding-top: 20px;
}
.main-container {
  height: 290px;
  margin-bottom: 270px;
}
.headers-container {
  padding-top: 25px;
  padding-bottom: 10px;
  padding-left: 13px;
  padding-right: 25px;
  display: flex;
  justify-content: space-between;
}
.list-header {
  font-family: "Times New Roman";
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 40px;
  color: #494949;
}
.see-all-header {
  font-family: "Times New Roman";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 17px;
  align-items: flex-end;
  color: #494949;
  padding-top: 18px;
}
@media (max-width: 991.98px) {
  .author-img {
    display: flex;
    flex: 0.5;
  }
  img {
    width: 300px;
    height: 100%;
  }
  .all {
    flex-direction: column;
    display: flex;
    align-items: center;
  }
  .author-image-text {
    display: flex;
    flex-direction: column;
  }
  .authors-div {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .main-container {
    height: auto;
    margin-bottom: 10px;
  }
  .list-header {
    font-size: 28px;
    line-height: 32px;
  }
  .see-all-header {
    font-size: 14px;
    line-height: 12px;
  }
  .author-info {
    display: flex;
    width: 355px;
    height: auto;
    flex-wrap: nowrap;
    overflow-x: auto;
    margin: 0 -10px;
    border: 1px solid #000000;
    border-radius: 5px;
  }
}
</style>