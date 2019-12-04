const express = require('express')
const router = express.Router()
const Post = require('../models/posts.js')
const Comment = require('../models/comments.js')
const Building = require('../models/buildings.js')






// create comment on post id -------
router.post('/:id', async (req, res, next) => {
	try {
		const newComment = {
			text: req.body.text,
			post: req.params.id,
			user: req.session.userId
		}

		const createdComment = await Comment.create(newComment)

		const foundPost = await Post.findById(req.params.id)
		console.log(foundPost)
		foundPost.comments.push(createdComment)
		// foundPost.users.push(req.session.userId)
		foundPost.save()

		res.json(createdComment)

	} catch(err){
		next(err)
	}
})

// edit comment ----

router.get('/:id/edit', async (req, res, next) => {
	try {
		const foundComment = await Comment.findById(req.params.id)
		res.json(foundComment)
	} catch(err){
		next(err)
	}
})

// update comment ----
router.put('/:id', async (req, res, next) => {
	try {
		const updatedComment = {
			text: req.body.text
		}
		const commentToUpdate = await Comment.findByIdAndUpdate(req.params.id, updatedComment)
		commentToUpdate.save()
		res.json(commentToUpdate)
	} catch(err){
		next(err)
	}
	
})


// delete comment -- 
router.delete('/:id', async (req, res, next) => {
	try {
		const deletedComment = await Comment.findByIdAndDelete(req.params.id)
		deletedComment.save()
		res.json('Comment has been deleted')
	} catch(err){
		next(err)
	}
})












module.exports = router