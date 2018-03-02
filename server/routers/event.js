const express = require('express')
const Event = require('../models/event')
const events = express.Router()

events.post('/events', (req, res, next) => {
  if (req.body) {
    new Event({
      ...req.body,
      subscribers: [req.body.createdBy],
    })
      .save()
      .then(event => {
        res.json(req)
      })
      .catch(err => console.error(err))
  } else {
    res.end('specify data')
  }
})

events.get('/events', (req, res, next) => {
 Event.find({})
   .then(events => {
     res.json(events)
   })
   .catch(next)
})

events.put('/events/:id/subscribe', (req, res, next) => {
  Event.findOneAndUpdate(
    {_id: req.params.id},
    {...req.body}
  )
    .then(event => {
      console.log('PUT request', events)
      res.json({event})
    })
    .catch(next)
})

events.delete('/events/:id', (req, res, next) => {
  Event.findByIdAndRemove(req.params.id)
    .then(event => {
      res.json({event})
    })
    .catch(next)
})

module.exports = events
