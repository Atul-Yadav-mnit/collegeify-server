const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    student_id:{
        type:String,
        required:true,
        unique:true,
        uppercase:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    facebook:{
        type:String,
    },
    instagram:{
        type:String,
    },
    twitter:{
        type:String
    },
    linkedin:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
}
)

  

var Users = mongoose.model('User',userSchema)

module.exports = Users