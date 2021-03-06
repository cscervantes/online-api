var express = require('express');
var router = express.Router();
var models = require('../models')

router.use(function timeLog (req, res, next) {
  console.log('Home Route Time: ', new Date())
  next()
})

/* GET home page. */
router.all('/', function(req, res, next) {
  if(req.method === 'POST'){
    var sort = {}
    var filter = { 
      website_name: { 
        $regex: eval(`/${req.body.website_name}/`),
        $options: "i"
        }
      }
    var limit = parseInt(req.body.limit) || 10
    sort[req.body.sort_by] = parseInt(req.body.sort_direction)
  }else{
    var filter = (req.query.filter) ? JSON.parse(req.query.filter) : {}
    var limit = parseInt(req.query.limit) || 10
    var sort = (req.query.sort) ? JSON.parse(req.query.sort) : {date_created: -1}
  }
  models.websites.find(filter).limit(limit).sort(sort).exec(function(err, result){
    if(err){
      next(err)
    }else{
      // console.log(result)
      res.render('website/index', { title: 'Express', data: result, path: req.url });
    }
  })
  
});

router.all('/article', function(req, res, next) {
  if(req.method === 'POST'){
    var sort = {}
    var filter = { 
      article_full_url: { 
        $regex: eval(`/${req.body.article_full_url}/`),
        $options: "i"
        }
      }
    var limit = req.body.limit
    sort[req.body.sort_by] = parseInt(req.body.sort_direction)
  }else{
    var filter = req.query.filter
    if(filter){
      filter = JSON.parse(req.query.filter)
      filter = { 
        article_full_url: { 
          $regex: eval(`/${filter.article_full_url}/`),
          $options: "i"
          }
        }
    }else{
      var filter = {}
    }
    var limit = parseInt(req.query.limit) || 10
    var sort = (req.query.sort) ? JSON.parse(req.query.sort) : {article_date_created_sys_time: -1}
  }
  models.articles.find(filter).limit(limit).sort(sort).exec(function(err, result){
    if(err){
      next(err)
    }else{
      res.render('article/index', { title: 'Articles', data: result, path: req.url });
    }
  })
  
});

router.all('/filter', function(req, res, next){
  models.filters.find({}).limit(10).exec(function(err, result){
    if(err){
      next(err)
    }else{
      res.render('filter/index', { title: 'Filters', data: result, path: req.url });
    }
  })
})

module.exports = router;
