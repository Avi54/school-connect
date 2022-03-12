const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Post = require('../models/Post')

router.get('/add', ensureAuth, (req, res) => {
    res.render('post/add')
})

router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Post.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router