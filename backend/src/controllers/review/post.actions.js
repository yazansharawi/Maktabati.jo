const models = require("../../models");
const Review = models.Review;

function getRandomRating() {
  return Math.floor(Math.random() * 5) + 1;
}
function getRandomComment() {
  const comments = [
    "Excellent book!",
    "Terrible book!",
    "Average book.",
    "Couldn't put it down!",
    "Waste of time.",
    "Highly recommended!",
    "Captivating storyline.",
    "Intriguing characters.",
    "A page-turner!",
    "Disappointing ending.",
    "Deep and thought-provoking.",
    "Too predictable.",
    "Great plot twists.",
    "Couldn't connect with the characters.",
    "Masterpiece!",
    "A must-read.",
    "Unique and original.",
    "Boring and uninteresting.",
    "Engaging from start to finish.",
    "Well-written and descriptive.",
    "Overrated in my opinion.",
    "Not my cup of tea.",
    "Compelling narrative.",
    "Lacked depth.",
    "Mind-blowing!",
    "Fast-paced and exciting.",
    "Couldn't stop reading.",
    "Unforgettable.",
    "Well-researched and informative.",
    "Slow and tedious.",
    "Epic journey.",
    "Unexpected plot twists.",
    "Character development was lacking.",
    "Fell short of expectations.",
    "Thoughtful and reflective.",
    "Just okay for me.",
    "A rollercoaster of emotions.",
  ];
  return comments[Math.floor(Math.random() * comments.length)];
}

async function createNewReview(req, res) {
  try {
    const reviews = [];
    for (let bookId = 1; bookId <= 50; bookId++) {
      for (let storeId = 1; storeId <= 39; storeId++) {
        const userId = 1;
        const rating = getRandomRating();
        const comment = getRandomComment();

        const newReview = await Review.create({
          userId,
          bookId,
          storeId,
          rating,
          comment,
        });

        reviews.push(newReview);
      }
    }

    return res.status(201).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  createNewReview,
};
