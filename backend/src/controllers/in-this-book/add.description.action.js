const models = require("../../models");
const inThisBook = models.inThisBook;

async function addDescription(req, res) {
  data = [
    
  ];

  try {
    await inThisBook.bulkCreate(data, { individualHooks: true });

    return res
      .status(201)
      .json({ message: "Done" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  addDescription,
};
