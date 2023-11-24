
const getActions = require('./get.actions')
const postActions = require("./post.actions")


module.exports = {
    '/': {
        get: {
            action: getActions.getReview
        },
        post:{
            action:postActions.createNewReview
        }
    },
}