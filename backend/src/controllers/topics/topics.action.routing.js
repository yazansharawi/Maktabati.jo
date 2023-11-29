const {addBookTopics} = require("./add.topics.action")

module.exports = {
    '/':{
        post:{
            action: addBookTopics
        }
    },
}