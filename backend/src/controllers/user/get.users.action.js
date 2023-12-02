const models = require("../../models");
const User = models.User;
const Review = models.Review;

async function getUsers(req, res) {
  User.findAll({
    where: {
      id: 1,
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
}



module.exports = {
  getUsers,
};
