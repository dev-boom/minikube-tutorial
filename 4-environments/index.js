const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello Kubenetes. Volume Mount')
})

app.listen(3000)
