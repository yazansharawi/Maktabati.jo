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

async function getUserById(req, res) {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ uuid: user.uuid });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getUsers,
  getUserById
};
