var express = require('express');
var router = express.Router();
var models = require('../models')
var async = require('async')

router.get('/add', function(req, res, next){
    async.waterfall([
        function(cb){
            models
            .filters
            .findOne({})
            .exec(function(err, result){
                if(err) return cb(null, err);
                else return cb(null, result)
            })
        }
    ], function(err, result){
        // console.log(result)
        if(err) next(err);
        res.render('website/add', {title: 'Add new Website', path: req.url, data: result})
    })    
})

router.get('/edit/:id', function(req, res, next){
    models.websites.findById(req.params.id, {}).exec(function(err, result){
        if(err){
            next(err)
        }else{
            res.render('website/edit', {title: 'Edit '+req.params.id, data: result, path: req.url})
        }
    })
    
})

router.get('/search_page', function(req, res, next){
    res.render('website/search', {title:'Search | Add', path: req.url})
})
module.exports = router