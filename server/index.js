// import needed libs

const bodyParser = require('body-parser')
const path = require('path')

// Set up and configure an app
const app = require('express')()
const config = require('./config')
const eventRouter = require('./routers/event')

// Connect to database
require('./db')

// Start listening to requests
app.listen(config.port, () => {
  console.log(`Do things that scare you. Server running at port: ${config.port}`)
})

// added for development
app.get('/favicon.ico', function(req, res) {
  res.status(204)
})

// Declare routers
app.use(bodyParser.json())

app.use('/api/v1/', eventRouter)

// error handling
app.use((req, res, next) => {
  const err = new Error(`Not Found ${req.path}`)
  err.status = 404
  next(err)
})

app.use((error, req, res, next) => {
  if (error) {
    console.log(error)
    return res.status(400).json({error})
  }
  next(error)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
