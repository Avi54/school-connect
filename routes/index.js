const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Post = require('../models/Post')

router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const posts = await Post.find({ 
            // removed await
            user: req.user.id
        }).lean()

        res.render('dashboard', {
            name: req.user.firstName,
            posts
            // image: req.user.photos[0].value
        })
    } catch (err) {
        console.error(err)
    }
})

module.exports = router