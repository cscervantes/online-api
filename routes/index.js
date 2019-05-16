var express = require('express');
var router = express.Router();
var models = require('../models')


/* GET home page. */
router.get('/', function(req, res, next) {
  models.websites.find({}).exec(function(err, result){
    if(err){
      next(err)
    }else{
      // console.log(result)
      res.render('website/index', { title: 'Express', data: result });
    }
  })
  
});

module.exports = router;
