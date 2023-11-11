const { getBooks } = require('./get.book.action')


module.exports = {
    '/': {
        get: {
            action: getBooks
        },
    },
}