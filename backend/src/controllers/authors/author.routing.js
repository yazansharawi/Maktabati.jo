
const { getMainPafeAuthors } = require('./get.author.action')


module.exports = {
    '/main-page': {
        get: {
            action: getMainPafeAuthors
        },
    },
}