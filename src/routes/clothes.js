'use strict';

const express = require('express');
const Clothe = require('../models/food');
const router = express.Router();
const clothe = new Clothe();
const validator = require('../middlewares/validator');



router.post('/', validator, postHandler);
router.get('/', getHandler);
router.get('/:id', getHandler);
router.put('/:id', validator, putHandler);
router.delete('/:id', deleteHandler);



function postHandler(req, res) {
  const respObj = clothe.create(req.body);
  res.json(respObj);
}
function getHandler(req, res) {
  const respObj = clothe.read(req.params.id);
  res.json(respObj);
}
function putHandler(req, res) {
  const respObj = clothe.update(req.params.id, req.body);
  res.json(respObj);
}
function deleteHandler(req, res) {
  const respObj = clothe.delete(req.params.id);
  res.json(respObj);
}

module.exports = router;
