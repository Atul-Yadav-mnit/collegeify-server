const mongoose = require('mongoose');
const Societies = require('./societySchema');
const Users = require('./userSchema');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    uid:{
        type:String,
        required:true
    },
    sid:{
        type:Schema.Types.ObjectId,
        ref:'Society'
    },
    designation:{
        type:String,
        required:true
    }
},
{
    toObject: { virtuals: true },
    toJSON:{virtuals:true}
}
)

memberSchema.virtual('member_user', {
    ref: 'User',
    localField: 'uid',
    foreignField: 'student_id',
    justOne: true // for many-to-1 relationships
})

var Members = mongoose.model('Member',memberSchema)

module.exports = Members