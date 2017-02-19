const express = require('express')
const app = express()

const ENV = process.env.NODE_ENV || 'development'

app.use(express.static('public'))
app.set('view engine', 'pug')

const maybeHtml = (req, res, next) => {
  if (req.accepts('html') && req.method.match(/get/i)) {
    return res.render('index')
  }
  next()
}

app.get('/', maybeHtml, (req, res) => {
  return res.render('index')
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!', ENV)
})
