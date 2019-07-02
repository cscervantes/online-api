var express = require('express');
var router = express.Router();
var model = require('../models')
var async = require('async')
var fs = require('fs')
var request = require('request')
var url_parse = require('url')
var section = require('../../online-collector/helpers/section')
var _config         = fs.readFileSync('../online-collector/default_section_config/index.json', 'utf-8');


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

router.get('/get_active_websites', function(req, res){
    model.websites.find({status: 'ACTIVE'}).exec(function(err, result){
        if(err) res.json(err);
        else res.json(result)
    })
})

router.get('/get_active_websites_with_subsection', function(req, res){
    model.websites.find({status: 'ACTIVE', has_subsection: true}).exec(function(err, result){
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

router.get('/view/:id', function(req, res){
    model.websites.findById({_id: req.params.id}).exec(function(err, result){
        if(err) res.json(err);
        else res.json(result);
    })
})

router.post('/search',function(req, res){
    var jsonBody = {}
    jsonBody.website_url = req.body.website_url
    jsonBody.main_section_config = JSON.parse(_config)
    jsonBody.fqdn = url_parse.parse(req.body.website_url).hostname
    jsonBody.main_sections = []
    async.waterfall([
        function(cb){
            request.get('http://localhost:4000/websites')
        },
        function(cb){
            section.automateSection(jsonBody, cb)
        }
    ], function(err, result){
        if(err){
            res.json(err)
        }else{
            res.json(result)
        }
    })
    
})
module.exports = router