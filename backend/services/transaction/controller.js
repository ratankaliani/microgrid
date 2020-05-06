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
      console.log(minTransaction)
      res.send(minTransaction)
});

export const findAllBuyer = (req, res, next) => {
  // Filter all files and find all transactions by a buyer
  Transaction
   .find({"buyer" : false})
   .sort({"pricePerShare" : 1})
   .limit(1)
   .exec(function(err, doc){
      let minTransaction= doc[0];
      console.log(minTransaction)
      res.send(minTransaction)
});
};

export const findAllSeller = (req, res, next) => {
  // Filter all files and find all transactions by a buyer
  Transaction
   .find({"buyer" : false})
   .sort({"pricePerShare" : 1})
   .limit(1)
   .exec(function(err, doc){
      let minTransaction= doc[0];
      console.log(minTransaction)
      res.send(minTransaction)
});
};


export const add = (req, res, next) => {
  // Requires seller, energyAmount and pricePerShare
  const newTransaction = new Transaction({
    _id: new mongoose.Types.ObjectId(),
    buyer: req.body.buyer,
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

















