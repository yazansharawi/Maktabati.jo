const express = require('express')
const lumie = require("lumie");
const path = require("path");
const app = express()
const port = 3000

app.get('/api/health', (req, res) => {
  res.send('alive!')
})

lumie.load(app, {
    preURL: 'api', // this to differ between frontend routes and backend routes
    verbose: true,
    ignore: ['*.spec', '*.action', 'helper'],
    controllers_path: path.join(__dirname, 'src/controllers')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})