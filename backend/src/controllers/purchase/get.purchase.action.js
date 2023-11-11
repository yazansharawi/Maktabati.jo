const models = require("../../models");
const purchase = models.purchase
module.exports.getPurchase = async (req, res) => {
    purchase.findAll()
    .then((purchase) => {
      return res.send(purchase);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
};
