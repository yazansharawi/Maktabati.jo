const models = require("../../models");
const Review = models.Review
module.exports.getReview = async (req, res) => {
    Review.findAll()
    .then((Review) => {
      return res.send(Review);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
};
