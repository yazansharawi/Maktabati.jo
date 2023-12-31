const models = require("../../models");
const User = models.User;

async function addUserPreferences(req, res) {
  try {
    const { uuid } = req.params;
    const {
      userFavoriteGenres,
      userFavoriteAuthors,
      userFavoriteBookType,
      userFavoriteBookAge,
    } = req.body;

    const user = await User.findOne({ where: { uuid } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.FavoriteGenres = userFavoriteGenres;
    user.FavoriteAuthors = userFavoriteAuthors;
    user.FavoriteBookAge = userFavoriteBookAge;
    user.FavoriteBookType = userFavoriteBookType;

    user.doneOnboarding = true;

    await user.save();

    return res
      .status(200)
      .json({ message: "User preferences saved successfully" });
  } catch (error) {
    console.error("Error saving user preferences:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function addUserLastFiveSearches(req, res) {
  const userUuid = req.params.uuid;
  const { genre } = req.body;

  try {
    const user = await User.findOne({ where: { uuid: userUuid } });
    if (!user) {
      return res.status(404).send('User not found');
    }
    let recentSearches = [];
    if (user.BasedOnYourSearch) {
      if (typeof user.BasedOnYourSearch === 'string') {
        recentSearches.push(user.BasedOnYourSearch);
      } else if (Array.isArray(user.BasedOnYourSearch)) {
        recentSearches = [...user.BasedOnYourSearch];
      }
    }

    recentSearches = [genre, ...recentSearches].filter(Boolean).slice(0, 5);

    user.BasedOnYourSearch = recentSearches;
    await user.save();

    res.status(200).send('Recent searches updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}





module.exports = {
  addUserPreferences,
  addUserLastFiveSearches,
};
