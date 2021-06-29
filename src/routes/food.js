'use strict';

const express = require('express');
const Food = require('../models/food');
const router = express.Router();
const food = new Food();
const validator=require('../middlewares/validator');



router.post('/',validator, postHandler);
router.get('/',getHandler);
router.get('/:id',getHandler);
router.put('/:id',validator,putHandler);
router.delete('/:id',deleteHandler);



function postHandler(req, res) {
  const respObj = food.create(req.body);
  res.json(respObj);
}
function getHandler(req,res) {
  const respObj=food.read(req.params.id);
  res.json(respObj);
}
function putHandler(req,res) {
  const respObj=food.update(req.params.id,req.body);
  res.json(respObj);
}
function deleteHandler(req,res) {
  const respObj =food.delete(req.params.id);
  res.json(respObj);

}
module.exports=router;