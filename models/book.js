const mongoose = require("mongoose")

const booksSchema = new mongoose.Schema({
    book_name:{
        type:String,
        required:true
    },
    stream:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    num:{
        type:Number,
        required:true,
    }
})
const Book = mongoose.model('Book',booksSchema)
module.exports = Book;