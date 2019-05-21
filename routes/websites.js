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

router.post('/update/:id', function(req, res){
    model.websites.findByIdAndUpdate(req.params.id, req.body, function(err, result){
        if(err) res.json(err);
        else res.json(result)
    })
})

router.get('/get_website_urls', function(req, res){
    model.websites.find({status: 'ACTIVE'}).exec(function(err, result){
        if(err) res.json(err);
        else res.json(result)
    })
})

router.put('/update/:id', function(req, res){
    model.websites.findByIdAndUpdate(req.params.id, req.body, {upsert: true}).exec(function(err, result){
        if(err) res.json(err);
        else res.json(result);
    })
})


module.exports = router