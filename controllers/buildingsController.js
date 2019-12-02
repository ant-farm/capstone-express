const express = require('express')
const router = express.Router()
// const superagent = require('superagent');
const Building = require('../models/buildings.js')

router.post('/', async (req, res, next) => {
	const property_address = req.body.property_address
	try {
		const building = await Building.findOne({
			property_address: req.body.property_address
		})
		if(building !== null){
			req.session.message = 'Building already exists!'
			res.json('Building already exists')
		}
		else{
			const createdBuilding = await Building.create({
				property_address: property_address
			})
			res.json(createdBuilding)

		}
		
	} catch(err){
		next(err)
	}
})

// // registration / user create route ----
// router.post('/register', async (req, res, next) => {
// 	console.log(req.body)
// 	const username = req.body.username
// 	try {
// 		const user = await User.findOne({
// 			username: username
// 		})
// 		if(user !== null) {
// 			req.session.message = 'Username taken!'
// 			// res.redirect('/users/register')
// 		} else{
// 			const password = req.body.password
// 			const hashedPassword = bcrypt.hashSync(
// 				password,
// 				bcrypt.genSaltSync(10)
// 			)
// 			const createdUser = await User.create({
// 				username: username,
// 				email: req.body.email,
// 				password: hashedPassword
// 			})
// 			req.session.loggedIn = true
// 			req.session.userId = createdUser._id
// 			req.session.username = createdUser.username
// 			// res.redirect('/')
// 			res.json(createdUser)
// 		}
// 	} catch(err){
// 		next(err)



module.exports = router