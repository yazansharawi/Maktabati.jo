const {addDescription} = require("./add.description.action")


module.exports = {
"/": {
    post: {
      action: addDescription,
    },
  },
}