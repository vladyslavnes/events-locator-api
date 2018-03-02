const express = require('express')
const Event = require('../models/event')
const events = express.Router()

events.post('/events', (req, res, next) => {
  console.log('BEHOLD, HE COMES RIDING ON A CLOWD!')
  new Event({
    ...req.body,
    subscribers: [req.body.createdBy],
    hash: req.body.name.toLowerCase().replace(/\s/g, '-').replace(/\W/g, '')
  }).save().then(event => {
    res.json({event})
    res.end()
    console.log('NP is in P!')
  }).catch(next)
})

events.get('/events', (req, res, next) => {
 Event.find({})
   .then(events => {
     res.json({events})
   })
   .catch(next)
})

events.put('/events/:hash/subscribe', (req, res, next) => {
  Event.update(
    {hash: req.params.hash},
    {$addToSet: {"subscribers": req.body.user}}
  )
    .then(event => {
      console.log('PUT request', event)
      res.json({event})
    })
    .catch(next)
})

events.delete('/events/:hash', (req, res, next) => {
  Event.findOneAndRemove({hash: req.params.hash})
    .then(event => {
      res.json({event})
    })
    .catch(next)
})

module.exports = events
