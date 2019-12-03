const express = require ('express')
const router = express.Router()
const Post = require('../models/posts.js')
const Building = require('../models/buildings.js')
// const User = require('..models/users.js')



// POST /posts/:building_id -- create forum post for this building
// PUT /posts/:id -- update post
// DELETE /posts/:id -- delete post

router.post('/:id', async (req, res, next) => {
	try{
		const newPost = {
			text: req.body.text
		}
		const createPost = await Post.create(newPost);
		createPost.users.push(req.session.userId)
		createPost.save()
		
		res.json(createPost)
		console.log(createPost)
	}catch(err){
		res.json("err")
	}	

})


module.exports = router