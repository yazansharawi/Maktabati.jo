<template>
  <div style="background-color: #f3f0e9;" id="all">
    <div style="display: flex;">
      <div class="left" style="display: flex; flex: 1.5; align-items: center">
        <v-sheet width="400" class="mx-auto" style="border-radius: 20px;">
          <h1 class="welcome">Welcome Back!</h1>
          <v-form class="pa-10" fast-fail @submit.prevent="login">
            <v-text-field
              variant="outlined"
              label="Email"
              v-model="username"
              prepend-inner-icon="mdi-email-outline"

            ></v-text-field>
 
            <v-text-field
              variant="outlined"
              v-model="password"
              label="Password"
              prepend-inner-icon="mdi-lock-outline"
            >
            </v-text-field>
            <a href="#" class="text-body-2 font-weight-regular"
              >Forgot Password?</a
            >
            <div  style="width: 50%; display:flex">
              <v-btn style="display: flex; flex: 1;" type="submit" color="#8E0000" block class="mt-2"
              ><p class="white">Sign in</p></v-btn
            >
            <v-btn style=" display: flex; flex: 1; position:relative; left:10px" type="submit" color="#808080" block class="mt-2"
              ><p class="white">Sign up</p></v-btn
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
  name: "login-page",
  data() {
    return {
      introDiv: true,
      firstQuestionDiv: false,
      currentStep: 0,
      totalSteps: 4,
      questions: [
        "What's your preferred genre?",
        "Who are your favorite authors?",
        "Do you prefer paperbacks or ebooks?",
        "Do you prefer old books or new ones?",
      ],
      genreOptions: [
        "Fiction",
        "Non-Fiction",
        "Mystery",
        "Romance",
        "Fantasy",
        "Science Fiction",
        "Biography",
        "Thriller",
        "Horror",
        "Historical Fiction",
        "Young Adult",
        "Self-Help",
        "Poetry",
        "Graphic Novels",
        "Classic Literature",
        "Adventure",
        "Humor",
        "Dystopian",
        "Memoir",
        "Contemporary",
        "Science",
        "Travel",
        "Religion",
        "Psychology",
        "Art",
        "History",
        "Parenting",
        "Business",
        "Philosophy",
        "Politics",
        "Children's",
        "Short Stories",
        "Essay Collections",
        "Educational",
        "Self-Development",
        "True Crime",
        "Western",
        "Romantic Suspense",
        "Paranormal",
        "Mythology",
        "Steampunk",
        "Drama",
        "Science Fantasy",
        "Sports",
        "War",
        "Detective",
        "Urban Fantasy",
        "Cyberpunk",
        "Time Travel",
        "Supernatural",
        "Other",
      ],
      selectedGenreOptions: [],
      authorOptions: [
        "J.K. Rowling",
        "Stephen King",
        "Agatha Christie",
        "George R.R. Martin",
        "Jane Austen",
        "Dan Brown",
        "Neil Gaiman",
        "Tolkien",
        "Terry Pratchett",
        "Haruki Murakami",
        "Mark Twain",
        "H.P. Lovecraft",
        "Charles Dickens",
        "Gabriel Garcia Marquez",
        "Khaled Hosseini",
        "Leo Tolstoy",
        "Arthur Conan Doyle",
        "J.R.R. Tolkien",
        "Victor Hugo",
        "Oscar Wilde",
        "Fyodor Dostoevsky",
        "Virginia Woolf",
        "Ray Bradbury",
        "Hermann Hesse",
        "Ernest Hemingway",
        "Albert Camus",
        "Agatha Christie",
        "Jules Verne",
        "J.D. Salinger",
        "Jane Austen",
        "Mary Shelley",
        "George Orwell",
        "Emily Dickinson",
        "Leo Tolstoy",
        "Charles Dickens",
        "Toni Morrison",
        "Edgar Allan Poe",
        "Oscar Wilde",
        "F. Scott Fitzgerald",
        "Walt Whitman",
      ],
      selectedAuthorOptions: [],
      bookTypeOptions: ["Customer", "Seller"],
      selectedBookTypeOptions: [],
      bookAgeOptions: ["Old Books", "New Ones"],
      selectedbookAgeOptions: [],
    };
  },
  methods: {
    goToNextStep() {
      this.currentStep++;
    },
    goToPrevStep() {
      this.currentStep--;
    },
    toggleGenreOption(index) {
      if (this.selectedGenreOptions.includes(index)) {
        this.selectedGenreOptions = this.selectedGenreOptions.filter(
          (item) => item !== index
        );
      } else {
        this.selectedGenreOptions.push(index);
      }
    },
    toggleAuthorOption(index) {
      if (this.selectedAuthorOptions.includes(index)) {
        this.selectedAuthorOptions = this.selectedAuthorOptions.filter(
          (item) => item !== index
        );
      } else {
        this.selectedAuthorOptions.push(index);
      }
    },
    finishQuestionnaire() {
      console.log("Questionnaire completed!");
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
.welcome{
  position: relative;
margin:auto;
}

.white{
  color:white;
  position:relative;
  top:8px;
}
.right {
  display: flex;
  flex: 0.5;
  flex-direction: row-reverse;
}
@media (max-width: 991.98px) {
  .right {
    display: none;
  }
  .left{

  }
}
</style>
