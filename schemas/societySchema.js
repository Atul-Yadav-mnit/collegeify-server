const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const societySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    president: {
        type: String,
        required: true
    },
    vice_president: {
        type: String,
        required: true
    },
    seceratory1: {
        type: String,
        required: true
    },
    seceratory2: {
        type: String,
        required: true
    }
},
    {
        toObject: { virtuals: true },
        toJSON:{virtuals:true}
    }
)

societySchema.virtual('society_president', {
    ref: 'User',
    localField: 'president',
    foreignField: 'student_id',
    justOne: true // for many-to-1 relationships
})

societySchema.virtual('society_vice_president', {
    ref: 'User',
    localField: 'vice_president',
    foreignField: 'student_id',
    justOne: true // for many-to-1 relationships
})

societySchema.virtual('society_seceratory1', {
    ref: 'User',
    localField: 'seceratory1',
    foreignField: 'student_id',
    justOne: true // for many-to-1 relationships
})

societySchema.virtual('society_seceratory2', {
    ref: 'User',
    localField: 'seceratory2',
    foreignField: 'student_id',
    justOne: true // for many-to-1 relationships
})

var Societies = mongoose.model('Society', societySchema)

module.exports = Societies