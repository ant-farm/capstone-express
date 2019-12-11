const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	first_name: {type: String},
	last_name: {type: String},
	email: {type: String, required: true},
	password: {type: String, required: true},
	// message_id: [{
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Message'
	// }]
	building: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Building'
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User