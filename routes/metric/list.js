const express = require('express');
const async = require('async');
const Metric = require('../../src/model/metric');
const router = express.Router();
router.use(express.json())
router.post('/',  function(req, res, next) {
  const payload = req.body;
  try {
    const u = new Metric();
    
    async.parallel([
      function(callback) {
        u.findAll(payload).then(function(r){
          callback(null, r);
        }).catch(function(error){
          callback(error);
        });
      }
    ],  function(err, results) {
      const sideEffects = results[0];
      return res.json(results[0]);
    });
  } catch (error) {
    return res.json(error);
  }
});
module.exports = router;
