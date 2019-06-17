var express = require('express');
var router = express.Router();
var models = require('../models')

router.get('/add', function(req, res, next){
    res.render('website/add', {title: 'Add new Website', path: req.url})
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
module.exports = router