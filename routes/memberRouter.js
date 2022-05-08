const express = require('express');
const Members = require('../schemas/membersSchema');
const Societies = require('../schemas/societySchema');
const Users = require('../schemas/userSchema');
const membersRouter = express.Router();
const authenticate = require('../authenticate')


membersRouter.route('/')
    .get(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
        Members.find({})
            .populate('member_user')
            .populate('sid')
            .then((members) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(members)
            })
            .catch((err) => next(err))
    })
    .post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
        Members.create(req.body)
            .then((member) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(member)
            })
            .catch((err) => next(err))
    })
    .put(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
        res.end("Operation Not supported :(")
    })
    .delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
        Members.remove()
            .then((members) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(members)
            })
            .catch((err) => next(err))
    })


membersRouter.route('/user/:uid')
    .get(authenticate.verifyUser,(req, res, next) => {
        if(req.params.uid == req.user.student_id)
        {
            Members.find({ uid: req.user.student_id })
            .populate('member_user')
            .populate('sid')
            .then((members) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(members)
            })
            .catch((err) => next(err))
        }
        else
        {
            res.statusCode = 403
            res.end("You are not authorized to view this profile details")
        }
       
    })
    .post(authenticate.verifyUser,(req, res, next) => {
        res.end("Operation Not supported :(")
    })
    .put(authenticate.verifyUser,(req, res, next) => {
        res.end("Operation Not supported :(")
    })
    .delete(authenticate.verifyUser,(req, res, next) => {
        Members.remove({ uid: req.user.student_id })
            .then((members) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(members)
            })
            .catch((err) => next(err))
    })


membersRouter.route('/society/')
    .all(authenticate.verifyUser,authenticate.verifyPresident,(req,res,next) =>{
        Societies.findOne({president :req.user.student_id})
        .then((society) => {
            if(society)
            {
                req.body.sid = society._id;
                next()
            }
            else
            {
                res.end("Your society does not exist")
            }
        })
        .catch((err) => next(err))
    })
    .get((req, res, next) => {
        Members.find({ sid: req.body.sid })
            .populate('member_user')
            .populate('sid')
            .then((members) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(members)
            })
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        res.end("Operation Not supported :(")
    })
    .put((req, res, next) => {
        res.end("Operation Not supported :(")
    })
    .delete((req, res, next) => {
        Members.remove({ sid: req.body.sid })
            .then((members) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(members)
            })
            .catch((err) => next(err))
    })


module.exports = membersRouter