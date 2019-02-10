const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

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

// #Route   POST api/profile
// #Desc    Create user profile
// #Access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
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
  }
)

module.exports = router
