const host = 'localhost'

module.exports = {
  port: process.env.port || process.env.PORT || '3006',
  mongoUrl: process.env.MONGODB_URI || `mongodb://${host}/events-locator`
}
