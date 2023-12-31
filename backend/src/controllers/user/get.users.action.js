const models = require("../../models");
const User = models.User;
const Review = models.Review;
const Author = models.author;
const Book = models.book;
const { Sequelize, Op } = require("sequelize");

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

async function getUserlastSearches(req, res) {
  const userUuid = req.params.uuid;

  try {
    const user = await User.findOne({ where: { uuid: userUuid } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let lastSearches = user.BasedOnYourSearch;
    if (!Array.isArray(lastSearches)) {
      lastSearches = lastSearches ? [lastSearches] : [];
    }

    lastSearches = cleanSearches(lastSearches).slice(-5);

    const books = await fetchBooksBasedOnGenres(lastSearches);

    return res.status(200).json({ books });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

function cleanSearches(searches) {
  return searches.flatMap((search) => {
    if (typeof search === "string" && /^\[.*\]$/.test(search)) {
      try {
        return JSON.parse(search);
      } catch (error) {
        return search;
      }
    } else {
      return search;
    }
  });
}

async function fetchBooksBasedOnGenres(genres) {
  try {
    return await Book.findAll({
      where: {
        genre: {
          [Sequelize.Op.in]: genres,
        },
      },
      limit: 10,
      include: {
        model: Author,
        attributes: ["name"],
      },
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

async function getUserByUuid(req, res) {
  const userUuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid: userUuid },
      attributes: ["firstName", "lastName", "email", "phoneNumber"],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by UUID:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getUsers,
  getUserById,
  getUserlastSearches,
  getUserByUuid,
};
