const express = require('express');

const router = express.Router();

const adminModel = require('../models/Admin');
const allOrders = adminModel.allOrders;
const addSushi = adminModel.addSushi;

router.get('/', (req, res) => {
  return res.json(allOrders());
});

router.post('/add', (req, res) => {
  console.log('test');
  const name = req?.body?.name?.length !== 0 ? req.body.name : undefined;
  const description = req?.body?.description?.length !== 0 ? req.body.description : undefined;
  const prixUnitaire = req?.body?.prix_unitaire?.length !== 0 ? req.body.prix_unitaire : undefined;
  const type = req?.body?.type?.length !== 0 ? req.body.type : undefined;

  const add = addSushi(name, description, prixUnitaire, type);
  console.log(add);
  return res.json(add);
});

module.exports = router;
