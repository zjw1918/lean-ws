'use strict';
var router = require('express').Router();
var AV = require('leanengine');

var Todo = AV.Object.extend('Todo');

// 查询 Todo 列表
router.get('/', function(req, res, next) {
  const {a, b} = req.query;
  
  res.json({
    'msg': (parseInt(a) || 0) + (parseInt(b) || 0),
  })
});


module.exports = router;
