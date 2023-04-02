const express = require('express')
const bodyparser= require('body-parser')
const router = require('./router/router')

const app = express()
app.use(bodyparser.json())
app.use('/', router)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`App running on port ${port} ...`)
})
