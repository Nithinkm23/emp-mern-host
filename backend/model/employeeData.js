const mongoose = require("mongoose")
const employeeSchema = mongoose.Schema({
    userId: String,
    name: String,
    location: String,
    position: String,
    salary: Number
})
const employeeData=mongoose.model('emplist',employeeSchema)
module.exports=employeeData;