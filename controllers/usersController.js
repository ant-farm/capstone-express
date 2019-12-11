const express = require ('express')
const router = express.Router()
const User = require('../models/users.js')
const bcrypt = require('bcryptjs')
const Building = require('../models/buildings.js')
// const cors = require('cors')



// index route ---------------
router.get('/', async (req, res, next) => {
	try {
		const users = await User.find()
	res.json(users)
	} catch(err){
		next(err)
	}
})




//create / login route --------------
router.post('/login', async (req, res, next) => {
	try {
		const foundUsers = await User.find({
			username: req.body.username
		})
		if(foundUsers.length === 0 ){
			req.session.message = 'invalid username or password'
			res.json('invalid username or password')
			// res.redirect('/users/login')
		} else{
			const password = req.body.password
			if(bcrypt.compareSync(password, foundUsers[0].password)){
				req.session.loggedIn = true
				req.session.userId = foundUsers[0]._id
				req.session.username = foundUsers[0].username
				// res.redirect('/')

			
				res.status(201).json({
					data: foundUsers,
				})
			} else{
				req.session.message = 'Invalid username or password'
				// res.redirect('/users/login')

			}
		}
	} catch(err){
		next(err)
	}
})

// registration / user create route ----
router.post('/register', async (req, res, next) => {
	console.log(req.body)
	const username = req.body.username
	try {
		const user = await User.findOne({
			username: username
		})
		console.log(user)
		if(user !== null) {
			console.log("username taken")
			req.session.message = 'Username taken!'
			// res.redirect('/users/register')
		} else{
			const password = req.body.password
			const hashedPassword = bcrypt.hashSync(
				password,
				bcrypt.genSaltSync(10)
			)
			const createdUser = await User.create({
				username: username,
				email: req.body.email,
				password: hashedPassword
			})
			req.session.loggedIn = true
			req.session.userId = createdUser._id
			req.session.username = createdUser.username
			// res.redirect('/')
			console.log("createdUser")
			console.log(createdUser)
			const data = {
				data: createdUser,
				status: {
					code: 201
				}
			}
			res.json(data)
		}
	} catch(err){
		next(err)
	}
})

// updating building id with user 
router.put('/:id', async (req, res, next) => {
    try {
    	console.log(req.session.userId);
        
        
        const building = await Building.findById(req.params.id)
        console.log(building, ' this is the building')
        building.users.push(req.session.userId)
        await building.save()

        const currentUser = await User.findById(req.session.userId)
        currentUser.building = building
        await currentUser.save()
     

        console.log(building)
        res.json(building)
    }
    catch (err) {
        next(err)
    }
})

// log out route ----------------
router.get('/logout', async (req, res, next) => {
	try {
		await req.session.destroy()
		// res.redirect('/')
		res.json('Logged out')
	} catch(err){
		next(err)
	}
})

//update ----
router.put('/', async (req, res, next) => {

	// requireAuth(req, res, next)
	if(!req.session.loggedIn) {
		req.session.message = 'You must be logged in to do that!'
		res.json('You must be logged in to do that!')
	} 
	else{
		try {

			const newInfoToUpdate = {
				first_name:	req.body.first_name,
				last_name: req.body.last_name
			}

			const updateUser = await User.updateOne({_id:req.session.userId}, newInfoToUpdate)

			const userUpdated = await User.findById(req.session.userId)
			res.json(userUpdated)
		} catch(err){
			next(err)
		}
	}

})


// delete -----

router.delete('/:id', async (req, res, next) => {
	try {
		const findUser = await User.deleteOne({_id: req.params.id})
		// await Location.deleteMany({user: req.params.id})
		// res.redirect('/')
		res.json('deleted user')
	
	} catch(err){
		next(err)
	}
})






module.exports = router