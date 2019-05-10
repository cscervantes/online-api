var express = require('express');
var router = express.Router();
var model = require('../models')

router.get('/', function(req, res){
    model.websites.find({}).exec(function(err, results){
        if(err){
            res.json(err)
        }else{
            results.method = `${req.method} ${req.originalUrl}`
            res.json(results)
        }
    })
    
})

router.post('/store', function(req, res){
    model.websites.storeWebsite(req.body, function(err, result){
        if(err) res.json(err);
        else res.json(result)
    })
})

module.exports = router