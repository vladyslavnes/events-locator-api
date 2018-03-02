const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
	name: String,
	description: String,
	hash: String,
	createdBy: {
		name:String,
		email: String
	},
	time: String,
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
