var express = require('express');
const Members = require('../schemas/membersSchema');
const Participants = require('../schemas/participantsSchema');
const Questions = require('../schemas/questionSchema');
const Users = require('../schemas/userSchema');
var usersRouter = express.Router();
var passport = require('passport')
var authenticate = require('../authenticate')

usersRouter.route('/login')
  .post(
    passport.authenticate('local',
      {
        session: false,
      })
    ,
    (req, res, next) => {
     
      var user = {}
    Participants.find({ uid: req.user.student_id })
      .populate('eid')
      .then((p) => {
        user = { ...user, participant: p }
        Questions.find({ uid: req.user.student_id })
          .populate('answerd_by')
          .populate('eid')
          .then((q) => {
            user = { ...user, question: q }
            Members.find({ uid: req.user.student_id })
              .populate('sid')
              .then((m) => {
                user = { ...user, member: m }
                Users.findOne({ student_id: req.user.student_id })
                  .then((u) => {
                    
                    console.log("First"+req.user.student_id)
                    console.log("Second"+u)
                    var token = authenticate.getToken({ _id: u._id });
                    console.log(token)
                    user = { ...user, self:u }
                    res.setHeader('Content-Type', 'application/json')
                    res.statusCode = 200
                    console.log(user)
                    res.json({ success: true, token: token, status: 'You are successfully logged in!',user:user });
                  })
                  .catch((err) => next(err))
              })
              .catch((err) => next(err))
          })
          .catch((err) => next(err))
      })
      .catch((err) => next(err))


      Users.findOne({ student_id: req.body.student_id }).
        then((user) => {
          
        })
        .catch((err) => {
          next(err)
        })


    }
  )



usersRouter.route('/signup')
  .post((req, res, next) => {
    Users.create(req.body)
      .then((user) => {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 200
        res.json(user)
      })
      .catch((err) => next(err))
  })



usersRouter.route('/')
  .all(authenticate.verifyUser ,authenticate.verifyAdmin,(req,res,next) => {
    console.log(req.user)
    next()
  })
  .get((req, res, next) => {
    Users.find({})
      .then((users) => {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 200
        res.json(users)
      })
      .catch((err) => next(err))
  })
  .post((req, res, next) => {
    res.statusCode = 403; +
      res.json("Operation Not supported :(")
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.json("Operation Not supported :(")
  })
  .delete((req, res, next) => {
    Participants.remove({})
      .then((p) => {
        Questions.remove({})
          .then((q) => {
            Members.remove({})
              .then((m) => {
                Users.remove({})
                  .then((users) => {
                    res.setHeader('Content-Type', 'application/json')
                    res.statusCode = 200
                    res.json(users)
                  })
                  .catch((err) => next(err))
              })
              .catch((err) => next(err))
          })
          .catch((err) => next(err))
      })
      .catch((err) => next(err))

  })

usersRouter.route('/user')
  .all(authenticate.verifyUser,(req,res,next) =>{
    next()
  })
  .get((req, res, next) => {
    var user = {}
    Participants.find({ uid: req.user.student_id })
      .populate('eid')
      .then((p) => {
        user = { ...user, participant: p }
        Questions.find({ uid: req.user.student_id })
          .populate('answerd_by')
          .populate('eid')
          .then((q) => {
          
            user = { ...user, question: q }
            Members.find({ uid: req.user.student_id })
              .populate('sid')
              .then((m) => {
                user = { ...user, member: m }
                Users.findOne({ uid: req.user.student_id })
                  .then((u) => {
                    user = { ...user, u }
                    res.setHeader('Content-Type', 'application/json')
                    res.statusCode = 200
                    res.json(user)
                  })
                  .catch((err) => next(err))
              })
              .catch((err) => next(err))
          })
          .catch((err) => next(err))
      })
      .catch((err) => next(err))
  })
  .post((req, res, next) => {
    res.json("Operation Not supported :(")
  })
  .put(authenticate.verifyUser,(req, res, next) => {
   
    Users.updateOne({ student_id: req.user.student_id }, {
      $set: req.body
    }, { new: true })
      .then((user) => {
        Users.find({uid:req.user.student_id})
        .then((up) => {
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200
          res.json(up[0])
        })
        .catch((err) => next(err))
      })
      .catch((err) => next(err))
  })
  .delete(authenticate.verifyAdmin,(req, res, next) => {
    Participants.remove({ uid: req.user.student_id })
      .then((p) => {
        Questions.remove({ uid: req.user.student_id })
          .then((q) => {
            Members.remove({ uid: req.user.student_id })
              .then((m) => {
                Users.remove({ uid: req.user.student_id })
                  .then((users) => {
                    res.setHeader('Content-Type', 'application/json')
                    res.statusCode = 200
                    res.json(users)
                  })
                  .catch((err) => next(err))
              })
              .catch((err) => next(err))
          })
          .catch((err) => next(err))
      })
      .catch((err) => next(err))
  })

module.exports = usersRouter;