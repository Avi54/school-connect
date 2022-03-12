const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Post = require('../models/Post')

router.get('/add', ensureAuth, (req, res) => {
    res.render('post/add')
})

module.exports = router