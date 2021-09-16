const mongoose = require('mongoose')

const QuoteSchema = new mongoose.Schema({
    id : {
        type : String
    },
    quote: {
        required:true,
        type: String
    }
})
const quote = mongoose.model('quote', QuoteSchema)

module.exports = quote;
