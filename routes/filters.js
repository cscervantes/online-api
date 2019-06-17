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

})

router.get('/add', function(req, res, next){
    res.render('filter/add', {title:'Add new Filters'})
})
module.exports = router;