const mongoose = require('mongoose')
mongoose.connect(process.env.mongodb_url)
    .then(() => {
        console.log('Connected to Mongodb Atlas')
    })
    .catch(() => {
        console.log('Error !! Cannot connect to Mongodb Atlas')
    })