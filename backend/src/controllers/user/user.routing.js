
const { getUsers } = require('./get.users.action')


module.exports = {
    '/': {
        get: {
            action: getUsers
        },
    },
}