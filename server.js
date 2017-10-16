const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./server/api')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(router)

app.get('*', function (req, res) {
  res.send("服务端已经在3000端口启动")
})

app.listen(3000, function () {
  console.log('Lather服务端已经在3000端口启动')
})