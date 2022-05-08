const express = require('express');
const Participants = require('../schemas/participantsSchema');
const Users = require('../schemas/userSchema');
const participantsRouter = express.Router();
const authenticate = require('../authenticate')


participantsRouter.route('/user/')
    .all(authenticate.verifyUser, (req, res, next) => {
        next()
    })
    .get((req, res, next) => {
        Participants.find({ uid: req.user.student_id })
            .populate('eid')
            .then((participants) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(participants)
            })
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        Participants.create(req.body)
            .then((participant) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                Participants.find({ _id: participant._id })
                    .populate('eid')
                    .then((participants) => {
                        res.setHeader('Content-Type', 'application/json')
                        res.statusCode = 200
                        res.json(participants[0])
                    })
                    .catch((err) => next(err))

            })
            .catch((err) => next(err))
    })
    .put((req, res, next) => {
        res.end("Operation Not supported :(")
    })
    .delete((req, res, next) => {
        Participants.remove({ uid: req.user.student_id })
            .then((participants) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(participants)
            })
            .catch((err) => next(err))
    })

participantsRouter.route('/event/:eid')
    .get(authenticate.verifyUser, authenticate.verifyPresident, (req, res, next) => {
        Participants.find({ eid: req.params.eid })
            .populate('participants_user')
            .populate('eid')
            .then((participants) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(participants)
            })
            .catch((err) => next(err))
    })
    .post(authenticate.verifyUser, authenticate.verifyPresident, (req, res, next) => {
        res.end("Operation Not supported :(")
    })
    .put(authenticate.verifyUser, authenticate.verifyPresident, (req, res, next) => {
        res.end("Operation Not supported :(")
    })
    .delete(authenticate.verifyUser, authenticate.verifyPresident, (req, res, next) => {
        Participants.remove({ eid: req.params.eid })
            .then((participants) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(participants)
            })
            .catch((err) => next(err))
    })


module.exports = participantsRouter