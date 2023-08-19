const express = require('express')
const app = new express()
const morgan = require('morgan')
const cors=require('cors')

require('dotenv').config() 
require('./DB/mongodb')
app.use(morgan('dev'))
app.use(cors())


const path = require('path');
 app.use(express.static(path.join(__dirname,'/build')));

 const dataRoute=require('./routes/dataRoute')
 app.use('/api',dataRoute)
 
 const userRoute=require('./routes/userRoute')
 app.use('/api',userRoute)

 app.get(`/*`, function(req, res) {
res.sendFile(path.join(__dirname
,'/build/index.html')); });



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})