const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

//Load validations
const validateProfileInput = require('../../validation/profile')

// Load models
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// #Route   GET api/profile/test
// #Desc    Tests profile route
// #Access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Route Works' }))

// #Route   GET api/profile
// #Desc    Current user profile
// #Access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {}

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user'
          return res.status(404).json(errors)
        }
        res.json(profile)
      })
      .catch(err => res.status(404).json(err))
  }
)

// #Route   GET api/profile/hall
// #Desc    Get all profiles
// #Access  Public
router.get('/all', (req, res) => {
  const errors = {}

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles yet'
        return res.status(404).json(errors)
      }
      res.json(profiles)
    })
    .catch(err =>
      res.status(404).json({ profile: 'There are no profiles yet' })
    )
})

// #Route   GET api/profile/handle/:handle
// #Desc    Get profile by handle
// #Access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {}

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user yet'
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// #Route   GET api/profile/user/:user_id
// #Desc    Get profile by user ID
// #Access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {}

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user yet'
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    )
})

// #Route   POST api/profile
// #Desc    Create or Edit user profile
// #Access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body)

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors)
    }

    // Get inputs
    const profileInputs = {}

    profileInputs.user = req.user.id
    if (req.body.handle) {
      profileInputs.handle = req.body.handle
    }

    if (req.body.company) {
      profileInputs.company = req.body.company
    }

    if (req.body.website) {
      profileInputs.website = req.body.website
    }

    if (req.body.location) {
      profileInputs.location = req.body.location
    }

    if (req.body.bio) {
      profileInputs.bio = req.body.bio
    }

    if (req.body.status) {
      profileInputs.status = req.body.status
    }

    if (req.body.githubusername) {
      profileInputs.githubusername = req.body.githubusername
    }
    //Skills are an array***
    if (typeof req.body.skills !== 'undefined') {
      profileInputs.skills = req.body.skills.split(',')
    }
    // Social
    profileInputs.social = {}
    if (req.body.youtube) {
      profileInputs.social.youtube = req.body.youtube
    }
    if (req.body.facebook) {
      profileInputs.social.facebook = req.body.facebook
    }
    if (req.body.instagram) {
      profileInputs.social.instagram = req.body.instagram
    }
    if (req.body.linkedin) {
      profileInputs.social.linkedin = req.body.linkedin
    }
    if (req.body.twitter) {
      profileInputs.social.twitter = req.body.twitter
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileInputs },
          { new: true }
        ).then(profile => res.json(profile))
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileInputs.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists'
            res.status(400).jason(errors)
          }
          // Save new profile
          new Profile(profileInputs).save().then(profile => res.json(profile))
        })
      }
    })
  }
)

module.exports = router
