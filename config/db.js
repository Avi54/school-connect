const mongoose = require('mongoose');

const connectDB = async () => {
    // connection
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        
        console.log(`DB Connected: ${conn.connection.host}`)
    // catching error
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

// export
module.exports = connectDB;