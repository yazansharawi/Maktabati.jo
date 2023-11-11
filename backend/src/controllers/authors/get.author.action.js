const models = require("../../models");
const author = models.author;

async function getMainPafeAuthors(req, res){
    author.findAll({
        where: {
            id: [1, 2]
        },
    })
    .then((authors) => {
        return res.send(authors);
    })
    .catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    });
};


module.exports = {
  getMainPafeAuthors
}