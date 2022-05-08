const mongoose = require('mongoose');
const Societies = require('./societySchema');
const Users = require('./userSchema');
const Schema = mongoose.Schema;

const participantsSchema = new Schema({
    uid:{
        type:String,
        required:true
    },
    eid:{
        type:Schema.Types.ObjectId,
        ref:'Event'
    }
},
{
    toObject: { virtuals: true },
    toJSON:{virtuals:true}
}
)

participantsSchema.virtual('participants_user', {
    ref: 'User',
    localField: 'uid',
    foreignField: 'student_id',
    justOne: true // for many-to-1 relationships
})

var Participants = mongoose.model('participants',participantsSchema)

module.exports = Participants