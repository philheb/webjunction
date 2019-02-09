const express = require("express");

const router = express.Router();

// #Route   GET api/auth/test
// #Desc    Tests auth route
// #Access  Public
router.get("/test", (req, res) => res.json({ msg: "Auth Route Works" }));

module.exports = router;
