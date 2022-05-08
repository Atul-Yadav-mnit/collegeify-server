const express = require('express');
const Questions = require('../schemas/questionSchema');
const Users = require('../schemas/userSchema');
const questionsRouter = express.Router();
const authenticate = require('../authenticate');
const Events = require('../schemas/eventSchema');



questionsRouter.route('/question/:qid')
    .get(authenticate.verifyUser, (req, res, next) => {
        Questions.find({ _id: req.params.qid })
            .populate('question_user')
            .populate('question_answerd_by_user')
            .populate('eid')
            .then((questions) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(questions[0])
            })
            .catch((err) => next(err))
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        res.end("Operation Not supported :(")
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        
        Questions.find({_id : req.params.qid})
            .then((ques) => {
                console.log("Hello1")
                Events.findOne({ eid: ques[0].eid })
                    .then((event) => {
                        console.log("Hello2"+event.manager1+" "+event.manager2+" "+ req.user.student_id)
                        if (event && (event.manager1 == req.user.student_id || event.manager2 == req.user.student_id)) {
                            req.body.answerd_by = req.user.student_id
                            Questions.findByIdAndUpdate(req.params.qid, {
                                $set: req.body
                            }, { new: true })
                                .then((questions) => {
                                    res.setHeader('Content-Type', 'application/json')
                                    res.statusCode = 200
                                    res.json(questions)
                                })
                                .catch((err) => next(err))
                        }
                        else {
                            res, statusCode = 403,
                                res.end("You are not authorized to answer this question")
                        }
                    })
                    .catch((err) => next(err))
            })
            .catch((err) => {
                console.log(err)
            next(err)})
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Questions.findOne(req.params.qid)
            .then((ques) => {
                
                if (ques.uid == req.user.student_id) {
                    Questions.findByIdAndDelete(req.params.qid)
                        .then((questions) => {
                            res.setHeader('Content-Type', 'application/json')
                            res.statusCode = 200
                            res.json(questions)
                        })
                        .catch((err) => next(err))
                }
                else {
                    res.end("You are not authorized to delete this question")
                }
            })
            .catch((err) => next(err))

    })


questionsRouter.route('/user/:uid')
    .all(authenticate.verifyUser, (req, res, next) => {
        Users.find({ student_id: req.user.student_id })
            .then((user) => {
                if (req.params.uid == user[0].student_id) {
                    req.params.uid = user[0].student_id
                    next()
                }
                else {
                    res.statusCode = 403
                    res.end("You are not authorized to acess this")
                }

            })
            .catch((err) => next(err))
    })
    .get((req, res, next) => {
        Questions.find({ uid: req.user.student_id })
            .populate('question_user')
            .populate('question_answerd_by_user')
            .populate('eid')
            .then((questions) => {
                console.log(questions)
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(questions)
            })
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        Questions.create(req.body)
            .then((question) => {
                Questions.find({ _id: question._id })
                .populate('question_user')
                .populate('question_answerd_by_user')
                .populate('eid')
                .then((questions) => {
                    console.log(questions[0])
                    res.setHeader('Content-Type', 'application/json')
                    res.statusCode = 200
                    res.json(questions[0])
                })
                .catch((err) => next(err))
            })
            .catch((err) => next(err))
    })
    .put((req, res, next) => {
        res.end("Operation Not supported :(")
    })
    .delete((req, res, next) => {
        Questions.remove({ uid: req.user.student_id })
            .then((questions) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(questions)
            })
            .catch((err) => next(err))
    })


questionsRouter.route('/events/:eid')
    .get((req, res, next) => {
        Questions.find({ eid: req.params.eid })
            .populate('question_user')
            .populate('question_answerd_by_user')
            .populate('eid')
            .then((questions) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(questions)
            })
            .catch((err) => next(err))
    })
    .post(authenticate.verifyUser, authenticate.verifyPresident, (req, res, next) => {
        res.end("Operation Not supported :(")
    })
    .put(authenticate.verifyUser, authenticate.verifyPresident, (req, res, next) => {
        res.end("Operation Not supported :(")
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Questions.remove({ eid: req.params.eid })
            .then((questions) => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.json(questions)
            })
            .catch((err) => next(err))
    })


module.exports = questionsRouter