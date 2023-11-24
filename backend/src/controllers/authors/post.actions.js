const models = require("../../models");
const author = models.author;

async function addAuthors(req, res) {
  try {
    await author.bulkCreate(data, { individualHooks: true });

    return res.status(201).json({ message: "Done" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  addAuthors,
};
