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
  console.log(`Take things easier. Server running at port: ${config.port}`)
})


// Enable CORS

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Ignore favicon request error

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
