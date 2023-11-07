
const { getReview } = require('./get.review.action')


module.exports = {
    '/': {
        get: {
            action: getReview
        },
    },
}