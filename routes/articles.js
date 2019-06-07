var express = require('express');
var router = express.Router();
var model = require('../models')

router.get('/', function(req, res){
    model.articles.find({}).exec(function(err, results){
        if(err){
            res.json(err)
        }else{
            results.method = `${req.method} ${req.originalUrl}`
            res.json(results)
        }
    })
    
})

router.post('/store', function(req, res){
    model.articles.storeArticle(req.body, function(err, result){
        if(err) res.json(err);
        else res.json(result)
    })
})

router.post('/bulkStore', function(req, res){
    model.articles.storeBulkArticles(req.body, function(err, result){
        if(err) res.json(err);
        else res.json(result);
    })
})

// router.post('/update/:id', function(req, res){
//     model.websites.findByIdAndUpdate(req.params.id, req.body, function(err, result){
//         if(err) res.json(err);
//         else res.json(result)
//     })
// })

router.get('/queued_articles', function(req, res){
    model.articles.find({article_status: 'QUEUED'}).limit(parseInt(req.query.limit) || 10).exec(function(err, result){
        if(err) res.json(err);
        else res.json(result)
    })
})

// router.get('/get_active_websites_with_subsection', function(req, res){
//     model.websites.find({status: 'ACTIVE', has_subsection: true}).exec(function(err, result){
//         if(err) res.json(err);
//         else res.json(result)
//     })
// })


router.put('/update/:id', function(req, res){
    model.articles.findByIdAndUpdate(req.params.id, req.body, {upsert: true}).exec(function(err, result){
        if(err) res.json(err);
        else res.json(result);
    })
})

router.get('/:id', function(req, res){
    model.articles.findById({_id: req.params.id}).exec(function(err, result){
        if(err) res.json(err);
        else res.json(result);
    })
})


module.exports = router