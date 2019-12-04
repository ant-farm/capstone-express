const express = require ('express')
const router = express.Router()
const Post = require('../models/posts.js')
const Building = require('../models/buildings.js')
// const User = require('..models/users.js')


// create post -----
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