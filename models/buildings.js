const mongoose = require('mongoose')

const buildingSchema = new mongoose.Schema({
	property_address: {type: String, required: true},
	creator_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})


const Building = mongoose.model('Building', buildingSchema)
module.exports = Building