const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars');
const passport = require('passport');
const path = require('path')
const session = require('express-session')
const connectDB = require('./config/db');
const mongoose = require('mongoose');

const MongoStore = require('connect-mongo')

dotenv.config({ path: './config/config.env' })

// passport
require('./config/passport')(passport)

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(session({
    secret: 'No',
    resave: false,
    saveUnitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', '.hbs'); 

// static
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('server running')
})