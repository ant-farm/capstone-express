const express = require('express')
const router = express.Router()
const Building = require('../models/buildings.js')

router.post('/', async (req, res, next) => {
	const propertyAddress = req.body.propertyAddress
	try {
		const building = await Building.findOne({
			propertyAddress: req.body.propertyAddress
		})
		if(building !== null){
			req.session.message = 'Building already exists!'
			res.json('Building already exists')
		}
		else{
			const createdBuilding = await Building.create({
				propertyAddress: propertyAddress
			})
			res.json(createdBuilding)

		}
		
	} catch(err){
		next(err)
	}
})

router.post('/search', async (req, res, next) => {
	const propertyAddress = req.body.propertyAddress
	try {
		const building = await Building.findOne({
			propertyAddress: propertyAddress
		})
		if(building){
			res.json(building)

		} else{
			req.session.message = 'Building does not exist'
			res.json('building does not exist')
		}
		
	} catch(err){
		next(err)
	}
})



router.get('/:id/forum', async (req, res, next) => {
    try {
    const allPosts = await Building.findById(req.params.id);
    res.json(allPosts,  'all posts')
    }
    catch (err) {
        next(err)
    }
})


module.exports = router