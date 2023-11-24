const models = require("../../models");
const Review = models.Review
const User = models.User
module.exports.getReview = async (req, res) => {
    Review.findAll({
      include: {
        model: User,
      },
    })
    .then((Review) => {
      return res.send(Review);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
};
