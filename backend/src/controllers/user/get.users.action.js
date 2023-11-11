const models = require("../../models");
const User = models.User;
const Review = models.Review;
const shoppingCart = models.shoppingCart
const purchase = models.purchase
const post = models.post

module.exports.getUsers = async (req, res) => {
  User.findAll({
    where:{
      id:1
    },
    include: Review,
    // include:shoppingCart,
    // include:post
  })
    .then((users) => {
      return res.send(users);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
};
