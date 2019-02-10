// const express = require('express')
import express from 'express'
const router = express.Router()

// #Route   GET api/profile/test
// #Desc    Tests profile route
// #Access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Route Works' }))

module.exports = router
