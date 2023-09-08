const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    course:{
        type:String,
        required:true
    },
    books_issued:{
        type:Number,
        default:0
    }
})
const Students = mongoose.model('students',studentSchema);
module.exports = Students;