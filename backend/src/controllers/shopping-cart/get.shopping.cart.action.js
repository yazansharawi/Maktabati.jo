const models = require("../../models");
const shoppingCart = models.shoppingCart
module.exports.getShoppingCart = async (req, res) => {
    shoppingCart.findAll()
    .then((cart) => {
      return res.send(cart);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
};
