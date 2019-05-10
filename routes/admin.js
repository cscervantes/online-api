var express = require('express');
var router = express.Router();
var model = require('../models')

router.get('/add', function(req, res, next){
    res.render('website/add', {title: 'Add new Website'})
})

module.exports = router