const { getBooksByGenre } = require('./get.book.action')


module.exports = {
    '/by-genre/:genre': {
        get: {
            action: getBooksByGenre
        },
    },
}