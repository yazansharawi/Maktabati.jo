const { getShoppingCart } = require('./get.shopping.cart.action')


module.exports = {
    '/': {
        get: {
            action: getShoppingCart
        },
    },
}