const mongoose = require('mongoose')

const buildingSchema = new mongoose.Schema({
	propertyAddress: {type: String, required: true},
	users: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]
})


const Building = mongoose.model('Building', buildingSchema)
module.exports = Building