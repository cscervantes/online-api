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
module.exports = router;