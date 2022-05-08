var express = require('express');
const Caraousels = require('../schemas/caraouselSchema');
var caraouselsRouter = express.Router();


caraouselsRouter.route('/')
.get((req,res,next) => {
    Caraousels.find({})
    .then((caraousels) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(caraousels);
    })
    .catch((err) => next(err))
})
.post((req,res,next) => {
    Caraousels.create(req.body)
    .then((caraousel) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(caraousel);
    })
    .catch((err) => next(err))
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type','text/plain');
    res.end("Operation Not supported :(")
})
.delete((req,res,next) => {
    Caraousels.remove({})
    .then((caraousels) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(caraousels);
    })
    .catch((err) => next(err))
})


caraouselsRouter.route('/:cid')
.get((req,res,next) => {
    Caraousels.findById(req.params.cid)
    .then((caraousel) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(caraousel);
    })
    .catch((err) => next(err))
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type','text/plain');
    res.end("Operation Not supported :(")
})
.put((req,res,next) => {
    Caraousels.findByIdAndUpdate(req.params.cid, {
        $set:req.body
    },{ new : true } )
    .then((caraousel) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(caraousel);
    })
    .catch((err) => next(err))
})
.delete((req,res,next) => {
    Caraousels.findByIdAndDelete(req.params.cid)
    .then((caraousels) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(caraousels);
    })
    .catch((err) => next(err))
})

module.exports = caraouselsRouter