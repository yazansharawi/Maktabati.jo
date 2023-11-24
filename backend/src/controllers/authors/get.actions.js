const models = require("../../models");
const author = models.author;

function generateRandomIds(count, min, max) {
  const randomIds = new Set();

  while (randomIds.size < count) {
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    randomIds.add(randomId);
  }

  return Array.from(randomIds);
}

async function getMainPafeAuthors(req, res) {
  const randomIds = generateRandomIds(2, 1, 30);

  author
    .findAll({
      where: {
        id: randomIds,
      },
    })
    .then((authors) => {
      return res.send(authors);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
}

async function getAuthorById(req, res) {
  author
    .findAll({
      where: {
        id: req.params.id,
      },
    })
    .then((authors) => {
      return res.send(authors);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
}
module.exports = {
  getMainPafeAuthors,
  getAuthorById,
};
