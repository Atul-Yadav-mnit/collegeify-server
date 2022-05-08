var passport = require('passport')
var LocalStratergy = require('passport-local')
var mongoose = require('mongoose')
const Users = require('./schemas/userSchema')
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const CustomStrategy = require('passport-custom').Strategy;
const Societies = require('./schemas/societySchema')
 
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


var config = require('./config.js');



passport.use(new LocalStratergy({
    usernameField: 'student_id',
    passwordField: 'password'
}, (student_id, password, done) => {
    console.log("here")
    console.log(student_id + " " + password)
    Users.findOne({ student_id: student_id })
        .then((user) => {
            if (user == null) {
                return done(null, false);
            }
            else if (user.password != password) {
                return done(null, false);
            }
            else {
                return done(null, user);
            }
        })
        .catch((err) => {done(err)})
}))

exports.getToken = function (user) {
    console.log("Token demanded for user ")
    console.log(user)
    return jwt.sign(user, config.secretKey,
        { expiresIn: 3600 });
};



var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        Users.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));



exports.verifyUser = passport.authenticate('jwt', { session: false });


exports.verifyAdmin = (req, res, next) => {
    console.log("hello "+req.user.isAdmin)
	if (req.user.isAdmin) {
		return next();
	} else {
		let err = new Error('You are not authorized to perform this operation!');
		err.status = 403;
		return next(err);
	}
};



exports.verifyPresident = (req, res, next) => {
    var x = mongoose.mongo.ObjectId(req.body.society);
    console.log(x)
	Societies.find({_id:x})
    .then((society) => {
        console.log(society)
        console.log(req.user.student_id)
        if(society[0] && society[0].president == req.user.student_id)
        {
            next()
        }
        else
        {
            let err = new Error('You are not authorized to perform this operation!');
            res.statusCode = 403
            next(err)
        }
    })
    .catch((err) => next(err))
};
