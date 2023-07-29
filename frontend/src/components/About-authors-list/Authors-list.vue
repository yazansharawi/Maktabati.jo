<template>
  <div>
    <div class="main-container">
      <div class="headers-container">
        <div class="list-header">Get to know The Authors</div>
        <div class="see-all-header">See all</div>
      </div>
      <div v-for="(author, index) in authors" :key="index" class="author-info-pic">
        <div class="authors-container">
          <div class="author-pic"></div>
          <div class="author-info">
            <div class="author-name">{{ author.name }}</div>
            <div class="author-bio">
              {{ author.bio }}
            </div>
            <div class="read-more-button">
              <v-btn
                prepend-icon="mdi-book-open"
                elevation="0"
                class="add-btn"
              >
                Read more
              </v-btn>
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
  props: {},
  data() {
    return {
        authors: [
        {
          name: "Nir Eyal",
          bio:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ex totam soluta fugiat quisquam ea possimus...",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>
.main-container {
  height: 290px;
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
.author-info-pic {
  padding: 25px;
}
.authors-container {
  display: flex;
  background-color: green;
  width: 700px;
  height: 450px;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin: 0 -10px;
  border: 1px solid #000000;
  border-radius: 5px;
}
.authors-info-container {
  height: 450px;
  background-color: green;
}
.author-pic {
  width: 50%;
  height: 100%;
}
.author-info {
  position: relative; /* Add this to make the positioning of the button relative to this container */
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  background-color: #fffdfd;
}
.author-name {
  margin-left: 15px;
  margin-top: 11px;
  font-family: "Times New Roman";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 34px;
  color: #000000;
}
.author-bio {
  padding: 15px;
  font-family: "Times New Roman";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: #000000;
}
.add-btn {
  background: #ae0000;
  border-radius: 5px;
  color: white;
}
.add-btn .v-icon {
  color: white;
}
.read-more-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
@media (max-width: 991.98px) {
  .main-container {
    height: auto;
    margin-top: 10px;
  }
  .list-header {
    font-size: 28px;
    line-height: 32px;
  }
  .see-all-header {
    font-size: 14px;
    line-height: 12px;
  }
    .authors-container {
    flex-direction: column; /* Switch to a column layout for mobile devices */
      width: 550px;
       height: 500px;
  }

  .author-pic {
    width: 100%; /* Author pic takes full width on mobile */
    height: 250px; /* Adjust the height as needed */
  }

  .author-info {
    width: 100%; /* Author info takes full width on mobile */
    margin-top: 10px; /* Add some spacing between author-pic and author-info */
  }
}
</style>
