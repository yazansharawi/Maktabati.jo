const models = require("../../models");
const topics = models.topics;

async function addBookTopics(req, res) {
  data = [
  ];

  try {
    await topics.bulkCreate(data, { individualHooks: true });

    return res.status(201).json({ message: "Done" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  addBookTopics,
};
