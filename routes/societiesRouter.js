var express = require('express');
const Events = require('../schemas/eventSchema');
const Participants = require('../schemas/participantsSchema');
const Societies = require('../schemas/societySchema');
const Users = require('../schemas/userSchema');
const Questions = require('../schemas/questionSchema')
var societiesRouter = express.Router();
const authenticate = require('../authenticate')

// console.log(authenticate)

societiesRouter.route('/')
    .get((req, res, next) => {
        Societies.find({})
            // .populate('society_president')
            // .populate('society_vice_president')
            // .populate('society_seceratory1')
            // .populate('society_seceratory2')
            .then((societies) => {
                console.log(societies)
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(societies)
            })
            .catch((err) => next(err))
    })
    .post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
        Societies.create(req.body)
            .then((s) => {
                Societies.findById(s._id)
                    .populate('society_president')
                    .populate('society_vice_president')
                    .populate('society_seceratory1')
                    .populate('society_seceratory2')
                    .then((society) => {
                        if (society.society_president == null || society.society_vice_president == null || society.society_seceratory1 == null || society.society_seceratory2 == null) {
                            Societies.findByIdAndRemove(society._id).
                                then((s) => {
                                    res.statusCode = 403
                                    res.end("The user you are trying to acess does not exist;(")
                                })
                                .catch((err) => next(err))
                        }
                        else {
                            res.setHeader('Content-Type', 'application/json')
                            res.statusCode = 200
                            res.json(society)
                        }
                    })
                    .catch((err) => next(err))

            })
            .catch((err) => next(err))
    })
    .put(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
        res.statusCode = 403;
        res.json("Operation Not supported :(")
    })
    .delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
        // Societies.remove({})
        //     .then((societies) => {
        //         res.setHeader('Content-Type', 'application/json')
        //         res.statusCode = 200
        //         res.json(societies)
        //     })
        //     .catch((err) => next(err))
        res.statusCode = 403;
        res.json("Operation Not supported :(")
    })

societiesRouter.route('/:sid')
    .get((req, res, next) => {
        Societies.findById(req.params.sid)
            .populate('society_president')
            .populate('society_vice_president')
            .populate('society_seceratory1')
            .populate('society_seceratory2')
            .then((society) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(society)
            })
            .catch((err) => next(err))
    })
    .post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
        res.json("Operation Not supported :(")
    })
    .put(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
        Societies.findByIdAndUpdate(req.params.sid, {
            $set: req.body
        }, { new: true })
            .then((society) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(society)
            })
            .catch((err) => next(err))
    })
    .delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
        Events.find({ sid: req.params.sid })
            .then((e) => {
                Participants.remove({ eid: e._id })
                    .then((p) => {
                        Questions.remove({ eid: e._id })
                            .then((q) => {
                                Events.remove({ eid: e._id })
                                    .then((events) => {
                                        Societies.remove({ _id: req.params.sid })
                                            .then((society) => {
                                                res.setHeader('Content-Type', 'application/json')
                                                res.statusCode = 200
                                                res.json(society)
                                            })
                                            .catch((err) => next(err))
                                    })
                                    .catch((err) => next(err))
                            })
                            .catch((err) => next(err))
                    })
                    .catch((err) => next(err))
            })
            .catch((err) => next(err))





    })

module.exports = societiesRouter;
