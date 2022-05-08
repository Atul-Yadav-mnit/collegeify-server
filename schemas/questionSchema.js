const mongoose = require('mongoose');
const Events = require('./eventSchema');
const Users = require('./userSchema');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    uid:{
        type:String,
        required:true
    },
    answerd_by:{
        type:String,
        default:''
    },
    eid:{
        type:Schema.Types.ObjectId,
        ref: 'Event',
        required:true
    },
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        default:''
    },
    status:{
        type:Boolean,
        default:false
    }
},
{
    toObject: { virtuals: true },
    toJSON:{virtuals:true}
}
)

questionSchema.virtual('question_user', {
    ref: 'User',
    localField: 'uid',
    foreignField: 'student_id',
    justOne: true // for many-to-1 relationships
})


questionSchema.virtual('question_answerd_by_user', {
    ref: 'User',
    localField: 'answerd_by',
    foreignField: 'student_id',
    justOne: true // for many-to-1 relationships
})


var Questions = mongoose.model('Question',questionSchema)

module.exports = Questions