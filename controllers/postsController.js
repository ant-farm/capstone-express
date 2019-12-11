const express = require ('express')
const router = express.Router()
const Post = require('../models/posts.js')
const Building = require('../models/buildings.js')
// const User = require('..models/users.js')

// get all posts
router.get('/:id', async (req, res, next) => {
	try {
		console.log(req.params)
		const foundPosts = await Post.find().where({building: req.params.id})
		res.json(foundPosts)
	} catch(err){
		next(err)
	}
})
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
		console.log('this is the postId', req.params.postId);
		console.log('this is req.body', req.body);
		const body = {
			text: req.body.text
		}
		const postToUpdate = await Post.findByIdAndUpdate(req.params.postId, body);
		postToUpdate.save()

		const updatedPost = await Post.findById(req.params.postId)
		console.log('this is the updated POst',postToUpdate) 
		res.json(updatedPost)
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