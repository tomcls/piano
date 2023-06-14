const express = require('express');
const Metric = require('../../src/model/metric');
const router = express.Router();
router.use(express.json())
router.post('/', async function(req, res, next) {
  const payload = req.body;
  try {
    const u = new Metric();
    const m = await u.add(payload);
    return res.json(m);
  } catch (error) {
    return res.json(error);
  }
});
module.exports = router;