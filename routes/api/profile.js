const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

//Load validations
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education.js')

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

// #Route   GET api/profile/all
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

// #Route   POST api/profile/experience
// #Desc    Add experience array to profile
// #Access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body)

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors)
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      }
      // Add to exp array
      profile.experience.unshift(newExp)
      profile.save().then(profile => res.json(profile))
    })
  }
)

// #Route   POST api/profile/education
// #Desc    Add education array to profile
// #Access  Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body)

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors)
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      }
      // Add to exp array
      profile.education.unshift(newEdu)
      profile.save().then(profile => res.json(profile))
    })
  }
)

// #Route   DELETE api/profile/experience/:exp_id
// #Desc    Delete experience from to profile
// #Access  Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get ID
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id)
        // Splice
        profile.experience.splice(removeIndex, 1)
        // Save
        profile.save().then(profile => res.json(profile))
      })
      .catch(err => res.status(404).json(err))
  }
)

// #Route   DELETE api/profile/education/:edu_id
// #Desc    Delete education from to profile
// #Access  Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get ID
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id)
        // Splice
        profile.education.splice(removeIndex, 1)
        // Save
        profile.save().then(profile => res.json(profile))
      })
      .catch(err => res.status(404).json(err))
  }
)

// #Route   DELETE api/profile/
// #Desc    Delete user and profile profile
// #Access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(profile => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        )
      })
      .catch(err => res.status(404).json(err))
  }
)

module.exports = router
