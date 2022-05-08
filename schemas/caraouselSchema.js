const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const caraouselSchema = new Schema({
    image:{
        type: String,
        required:true
    },
    altText:{
        type: String,
        required:true
    },
    caption:{
        type: String,
        required:true
    }
})

var Caraousels = mongoose.model('Caraousel',caraouselSchema)

module.exports = Caraousels

