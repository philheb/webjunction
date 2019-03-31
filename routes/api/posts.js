const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load models
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

// Load validation
const validatePostInput = require('../../validation/post')

// #Route   GET api/posts/test
// #Desc    Tests posts route
// #Access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Route Works' }))

// #Route   GET api/posts
// #Desc    Get all posts
// #Access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }))
})

// #Route   GET api/posts/:id
// #Desc    Get post by ID
// #Access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found with that ID' }))
})

// #Route   POST api/posts
// #Desc    Create single post
// #Access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id,
  })
  newPost.save().then(post => res.json(post))
})

// #Route   DELETE api/posts/:id
// #Desc    Delete a post by ID
// #Access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: 'User not authorized' })
        }
        post.remove().then(() => res.json({ success: true }))
      })
      .catch(err => res.status(404).json({ postnotfound: 'No posts found' }))
  })
})

// #Route   POST api/posts/like/:id
// #Desc    Like post
// #Access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(() => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          return res.status(400).json({ alreadyliked: 'User already liked this post' })
        }
        post.likes.unshift({ user: req.user.id })

        post.save().then(post => res.json(post))
      })
      .catch(err => res.status(404).json({ postnotfound: 'No posts found' }))
  })
})

// #Route   POST api/posts/unlike/:id
// #Desc    Unlike post
// #Access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(() => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
          return res.status(400).json({ notlikedliked: 'This post was not liked by this user' })
        }

        const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id)

        post.likes.splice(removeIndex, 1)

        post.save().then(post => res.json(post))
      })
      .catch(err => res.status(404).json({ postnotfound: 'No posts found' }))
  })
})

// #Route   POST api/posts/comment/:id
// #Desc    Add comment to post
// #Access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  Post.findOne({ user: req.user.id }).then(() => {
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        }

        post.comments.unshift(newComment)

        post.save().then(post => res.json(post))
      })
      .catch(err => res.status(404).json({ postnotfound: 'No posts found with this ID' }))
  })
})

// #Route   DELETE api/posts/comment/:id/:comment_id
// #Desc    Delete comment from post
// #Access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(comment => comment._id.toString() === req.params.comment_id)
            .length === 0
        ) {
          return res.status(404).json({ commentdoesnotexist: 'Comment does not exist' })
        }
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id)
        post.comments.splice(removeIndex, 1)
        post.save().then(post => res.json(post))
      })
      .catch(err => res.status(404).json({ postnotfound: 'No comments found with this ID' }))
  }
)

module.exports = router
