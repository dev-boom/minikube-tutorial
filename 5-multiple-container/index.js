const express = require('express')
const app = express()

const myConfigText = process.env.MY_CONFIG_TEXT;
const mySecretText = process.env.MY_SECRET_TEXT;

app.get('/', function (req, res) {
  res.send(`Hello Kubenetes. config: ${myConfigText} secret: ${mySecretText}`)
})

app.listen(3000)
