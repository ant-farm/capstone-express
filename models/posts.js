const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
	users: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	building: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Building'
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comments'
	}],
	text: {type: String, required: true},
	date: { type: Date, default: Date.now }
})

// input

const Post = mongoose.model('Post', postSchema)

module.exports = Post