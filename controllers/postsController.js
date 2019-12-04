const express = require ('express')
const router = express.Router()
const Post = require('../models/posts.js')
const Building = require('../models/buildings.js')
// const User = require('..models/users.js')


// create post with building ID in url -----
router.post('/:id', async (req, res, next) => {
	try{
		console.log(req.body.text)
		const newPost = {
			users: req.session.userId,
			building: req.params.id,
			text: req.body.text

		}
		const createPost = await Post.create(newPost);
		
		res.json(createPost)
	}catch(err){
		res.json(err)
	}	
})

// edit post ----
router.get('/:id/edit', async (req, res, next) => {
	try {
		const foundPost = await Post.findById(req.params.id)
		res.json(foundPost)
	}
	catch (err) {
		next(err)
	}
})

// update post ----
router.put('/:postId', async (req, res, next) => {
	try {
		const updatedPost = {
			text: req.body.text
		}
		const postToUpdate = await Post.findByIdAndUpdate(req.params.postId, updatedPost);
		postToUpdate.save()
		console.log(postToUpdate) 
		res.json(postToUpdate)
	} catch(err){
		next(err)
	}
})
// delete post ---
router.delete('/:id', async (req, res, next) => {
	try {
		const deletedPost = await Post.findByIdAndDelete(req.params.id)
		deletedPost.save()
		res.json('Post has been deleted!')
	} catch(err){
		next(err)
	}
})

module.exports = router