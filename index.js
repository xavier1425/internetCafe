const express = require('express')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()

const routes = require('./routes/router')
const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(upload.array())
app.use(express.static('public'))

routes(app)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))