const express = require('express')
const router = express.Router()


router.post('/login', (req, res) => {
    res.status(200).json({message:"This first server is created by express"})
})

router.post('/signup', (req, res) => {
    app.status(200).json({message:"This first server is created by express"})
})
router.post('/logout', (req, res) => {
    app.status(200).json({message:"This first server is created by express"})
})

module.exports = router;