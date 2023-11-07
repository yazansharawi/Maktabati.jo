
const { getPurchase } = require('./get.purchase.action')


module.exports = {
    '/': {
        get: {
            action: getPurchase
        },
    },
}