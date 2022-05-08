var express = require('express');
const Events = require('../schemas/eventSchema');
const Participants = require('../schemas/participantsSchema');
const Questions = require('../schemas/questionSchema');
var eventsRouter = express.Router();
const authenticate = require('../authenticate')


eventsRouter.route('/')
    .get((req, res, next) => {
        Events.find({})
            .populate('society')
            .populate('event_manager1')
            .populate('event_manager2')
            .then((events) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(events)
            })
            .catch((err) => next(err))
    })
    .post(authenticate.verifyUser,authenticate.verifyPresident,(req, res, next) => {
        res.statusCode = 403;
        res.end("Operation Not supported :(")
    })
    .put(authenticate.verifyUser,authenticate.verifyPresident,(req, res, next) => {
        res.statusCode = 403;
        res.end("Operation Not supported :(")
    })
    .delete(authenticate.verifyUser,authenticate.verifyPresident,(req, res, next) => {
        Participants.remove({})
            .then((p) => {
                Questions.remove({})
                    .then((q) => {
                        Events.remove({})
                            .then((events) => {
                                res.setHeader('Content-Type', 'application/json')
                                res.statusCode = 200
                                res.json(events)
                            })
                            .catch((err) => next(err))
                    })
                    .catch((err) => next(err))
            })
            .catch((err) => next(err))

    })

eventsRouter.route('/society/:sid')
    .all((req,res,next) => {
        console.log(req)
        next()
    })
    .get((req, res, next) => {
        Events.find({ society: req.params.sid })
            .populate('society')
            .populate('event_manager1')
            .populate('event_manager2')
            .then((events) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(events)
            })
            .catch((err) => next(err))
    })
    .post(authenticate.verifyUser,authenticate.verifyPresident,(req, res, next) => {
        Events.create({ ...req.body, society: req.params.sid })
            .then((event) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(event)
            })
            .catch((err) => next(err))
    })
    .put(authenticate.verifyUser,authenticate.verifyPresident,(req, res, next) => {
        res.statusCode = 403;
        res.end("Operation Not supported :(")
    })
    .delete(authenticate.verifyUser,authenticate.verifyPresident,(req, res, next) => {
        res.statusCode = 403;
        res.end("Operation Not supported :(")
    })

eventsRouter.route('/event/:eid')
    .get((req, res, next) => {
        Questions.find({ eid: req.params.eid })
            .then((questions) => {
                Events.findById(req.params.eid)
                    .populate('society')
                    .populate('event_manager1')
                    .populate('event_manager2')
                    .then((event) => {
                        res.setHeader('Content-Type', 'application/json')
                        res.statusCode = 200
                        event.questions = questions
                        res.json(event)
                    })
                    .catch((err) => next(err))
            })
            .catch((err) => next(err))


    })
    .post(authenticate.verifyUser,authenticate.verifyPresident,(req, res, next) => {
        res.end("Operation Not supported :(")
    })
    .put(authenticate.verifyUser,authenticate.verifyPresident,(req, res, next) => {
        Events.findByIdAndUpdate(req.params.eid,
            {
                $set: req.body
            }, { new: true })
            .then((events) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(events)
            })
            .catch((err) => next(err))
    })
    .delete(authenticate.verifyUser,authenticate.verifyPresident,(req, res, next) => {
        Participants.remove({ eid: req.params.eid })
            .then((p) => {
                Questions.remove({ eid: req.params.eid })
                    .then((q) => {
                        Events.remove({ eid: req.params.eid})
                            .then((events) => {
                                res.setHeader('Content-Type', 'application/json')
                                res.statusCode = 200
                                res.json(events)
                            })
                            .catch((err) => next(err))
                    })
                    .catch((err) => next(err))
            })
            .catch((err) => next(err))
    })

module.exports = eventsRouter;