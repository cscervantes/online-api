var express = require('express');
var router = express.Router();
var model = require('../models')
var moment = require('moment')

router.get('/', function(req, res){
    model.articles.find({}).limit(parseInt(req.query.limit) || 10).exec(function(err, results){
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

router.get('/queued_articles', function(req, res){
    model.articles.find({article_status: 'QUEUED'}).populate({path:'publication', select:'selectors'}).limit(parseInt(req.query.limit) || 10).exec(function(err, result){
        if(err) res.json(err);
        else res.json(result)
    })
})

router.put('/update/:id', function(req, res){
    // console.log(req.body)
    model.articles.findByIdAndUpdate(req.params.id, req.body, {upsert: true}).exec(function(err, result){
        if(err) res.json(err);
        else res.json(result);
    })
})

router.get('/:id', function(req, res){
    model.articles.findById({_id: req.params.id}).populate('publication').exec(function(err, result){
        if(err) res.json(err);
        else res.json(result);
    })
})

router.get('/view/:id', function(req, res){
    model.articles.findById(req.params.id).exec(function(err, result){
        result.article_date_created_sys_time = moment(result.article_date_created_sys_time).format('LLLL')
        result.article_date = moment(result.article_date_created_sys_time).format('LLLL')
        result.article_datetime = moment(result.article_date_created_sys_time).format('LLLL')
        console.log(result)
        if(err) next(err);
        else res.render('article/view', {title: 'Viewing article', data: result});
    })
})

router.get('/edit/:id', function(req, res){
    model.articles.findById(req.params.id).exec(function(err, result){
        result.article_date_created_sys_time = moment(result.article_date_created_sys_time).format('LLLL')
        result.article_date = moment(result.article_date_created_sys_time).format('LLLL')
        result.article_datetime = moment(result.article_date_created_sys_time).format('LLLL')
        console.log(result)
        if(err) next(err);
        else res.render('article/edit', {title: 'Editing article', data: result});
    })
});

router.get('/delete/:id', function(req, res){
    model.articles.findByIdAndDelete(req.params.id).exec(function(err){
        if(err) next(err);
        else res.redirect('/article');
    })
})

module.exports = router