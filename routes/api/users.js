// const express = require('express')
// const router = express.Router()
// const gravatar = require('gravatar')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const keys = require('../../config/keys')
// const passport = require('passport')

import express from 'express'
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import keys from '../../config/keys'
import passport from 'passport'
const router = express.Router()

//Import User model
const User = require('../../models/User')

// #Route   GET api/users/test
// #Desc    Tests users route
// #Access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Route Works' }))

// #Route   GET api/users/register
// #Desc    Register
// #Access  Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' })
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      })

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// #Route   GET api/users/login
// #Desc    Login User / Returning JWT Token
// #Access  Public
router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  //Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json({ email: 'User not found' })
    }
    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //if Matched
        // Create JWT payload
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        }
        //Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: '1d' },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            })
          }
        )
      } else {
        return res.status(400).json({ password: 'Password incorrect' })
      }
    })
  })
})

// #Route   GET api/users/current
// #Desc    Returning current user
// #Access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    })
  }
)

module.exports = router
