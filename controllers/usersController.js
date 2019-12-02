const express = require ('express')
const router = express.Router()
const User = require('../models/users.js')
const bcrypt = require('bcryptjs')


console.log('trying users first')

// index route ---------------
router.get('/', (req, res) => {
	// res.render('/index.ejs')
	res.json('users')
})
// login ----

// router.get('/login', (req, res) => {
// 	let messageToShow = ''
// 	if(req.session.message){
// 		messageToShow = req.session.message
// 		req.session.message = ''
// 	}

// })


// register -----
// router.get('/register', (req, res) => {
// 	let messageToShow = ''
// 	if(req.session.message){
// 		messageToShow = req.session.message
// 		req.session.message = ''
// 	}
// })

//create route --------------
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
				res.json('logged in successfully')
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
		if(user !== null) {
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
			res.json(createdUser)
		}
	} catch(err){
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