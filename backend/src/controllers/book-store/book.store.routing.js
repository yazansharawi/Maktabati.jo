
const { getBookStroeInfo } = require('./get.book.store.action')


module.exports = {
    '/': {
        get: {
            action: getBookStroeInfo
        },
    },
}