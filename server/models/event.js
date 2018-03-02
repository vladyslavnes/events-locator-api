const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
	name: String,
	description: String,
	createdBy: {
		name:String,
		email: String
	},
	startTime: Date,
	endTime: Date,
	coords: {
		lat: Number,
		lng: Number
	},
	subscribers: [
		{
			name: String,
			email: String
		}
	]
})

module.exports = mongoose.model('Event', eventSchema)
