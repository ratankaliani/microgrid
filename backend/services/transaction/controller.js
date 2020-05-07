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
  // Filter based on Object id (pass in object id), seller and accepted
  console.log(req.body);
  Transaction.findByIdAndUpdate(req.body.id, req.body, {new: true}, function(err, transaction) {
    console.log(transaction);
    res.send(transaction);
    
  });
};
export const findMin = (req, res, next) => {
  // Filter all files and find minimum transaction that is not accepted (no buyer)
  Transaction
   .find({"accepted" : false})
   .sort({"pricePerShare" : 1})
   .limit(1)
   .exec(function(err, doc){
      let minTransaction= doc[0];
      res.send(minTransaction)
  });
};

export const findAll = (req, res, next) => {
  // Filter all files and find all transactions by a buyer
  if (req.body.seller && req.body.buyer) {
    Transaction
    .find({"seller" : req.body.seller,
            "buyer" : req.body.buyer})
    .exec(function(err, doc){
        let allTransaction= doc;
        res.send(allTransaction)
    });
  }
  else if (req.body.buyer) {
    Transaction
    .find({"buyer" : req.body.buyer})
    .exec(function(err, doc){
        let allTransaction= doc;
        res.send(allTransaction)
    });
  }
  else if (req.body.seller) {
    Transaction
    .find({"seller" : req.body.seller})
    .exec(function(err, doc){
        let allTransaction= doc;
        res.send(allTransaction)
    });
  }
  else {
    res.send({})
  }
};


export const add = (req, res, next) => {
  // Requires seller, energyAmount and pricePerShare
  const newTransaction = new Transaction({
    _id: new mongoose.Types.ObjectId(),
    seller: req.body.seller,
    energyAmount: req.body.energyAmount,
    pricePerShare: req.body.pricePerShare,
    totalPrice: req.body.energyAmount * req.body.pricePerShare
    })
    newTransaction
        .save()
        .then(transaction => {
            res.json(transaction);
        })
        .catch(err => console.log(err));
};

















