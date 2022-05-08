const mongoose = require('mongoose');
const Societies = require('./societySchema');
const Users = require('./userSchema');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    society :{
        type: Schema.Types.ObjectId,
        ref: 'Society'
    },
    applyBefore : {
        type:Date,
        required:true
    },
    eventDate : {
        type:Date,
        required:true
    },
    location : {
        type:String,
        required:true
    },
    image : {
        type:String,
        required:true
    },
    manager1 : {
        type:String,
        required:true
    },
    manager2 : {
        type:String,
        required:true
    },
    member:{
        type: Boolean,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    questions: 
    {
        type:Array
    }
},
{
    toObject: { virtuals: true },
    toJSON:{virtuals:true}
}
)

eventSchema.virtual('event_manager1',{
    ref: 'User',
    localField: 'manager1',
    foreignField: 'student_id',
    justOne: true // for many-to-1 relationships
})

eventSchema.virtual('event_manager2',{
    ref: 'User',
    localField: 'manager2',
    foreignField: 'student_id',
    justOne: true // for many-to-1 relationships
})

var Events = mongoose.model('Event',eventSchema)

module.exports = Events