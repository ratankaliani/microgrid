// import {NextFunction, Request, Response} from 'express';
import os from 'os';
import path from 'path';
import uri from "../../mondb.js"
import mongoose from 'mongoose';
import User from '../../models/user.js';

import Transaction from '../../models/transaction.js'
 
mongoose.set('useFindAndModify', false);


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
export const update = (req, res, next) => {
  // Filter based on Object id
  console.log(req.body);
  Transaction.findByIdAndUpdate(req.body.id, req.body, {new: true}, function(err, transaction) {
    console.log(transaction);
    res.send(transaction);
    
  });

};
export const findMin = (req, res, next) => {
  // If a query string ?publicAddress=... is given, then filter results
  if (req.query && req.query.publicAddress) {
    const whereClause = req.query.publicAddress;
    var query = {publicAddress: whereClause};
  }
  else {
    var query = {};
  }
  return User.find(query)
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json();
    });

};
export const add = (req, res, next) => {
  // If a query string ?publicAddress=... is given, then filter results
  if (req.user.payload.id != req.params.userId) {
    return res.status(401).send({
      error: 'You can can only access yourself'
    });
  }

  return User.findById(req.params.userId)
  .exec()
  .then(user => res.status(200).json(user))
  .catch(err => {
    console.log(err)
    res.status(500).json();
  });

};

















