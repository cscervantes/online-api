var express = require('express');
var router = express.Router();
var models = require('../models')

router.use(function timeLog (req, res, next) {
    console.log('Filter Route Time: ', new Date())
    next()
})

router.get('/', function(req, res, next){
    models.filters.find({}).exec(function(err, result){
        if(err) res.json(err);
        else res.json(result);
    })
})

router.post('/store', function(req, res, next){
    models.filters.storeFilter(req.body, function(err, result){
        if(err) res.json(err);
        else  res.json(result);
    })
})

router.get('/add', function(req, res, next){
    res.render('filter/add', {title:'Add new Filters'})
})

router.get('/view/:id', function(req, res, next){
    models.filters.findById(req.params.id).exec(function(err, result){
        if(err) next(err);
        else res.render('filter/view',  {title: req.params.id, data: result});
    })
})

router.get('/edit/:id', function(req, res, next){
    models.filters.findById(req.params.id).exec(function(err, result){
        if(err) next(err);
        else res.render('filter/edit',  {title: req.params.id, data: result});
    })
})

router.post('/update/:id', function(req, res, next){
    models.filters.findByIdAndUpdate(req.params.id, req.body).exec(function(err, result){
        if(err) res.json(err);
        else res.json(result);
    })
})

router.get('/delete/:id', function(req, res, next){
    models.filters.findByIdAndRemove(req.params.id).exec(function(err, result){
        if(err) next(err);
        else res.redirect('/filter');
    })
})

module.exports = router;