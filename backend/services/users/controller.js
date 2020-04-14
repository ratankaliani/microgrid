// import {NextFunction, Request, Response} from 'express';
import os from 'os';
import path from 'path';
import uri from "../../mondb.js"
import mongoose from 'mongoose';
import User from '../../models/user.js';


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

export const findMongo = (req, res, next) => {
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
export const getMongo = (req, res, next) => {
  // AccessToken payload is in req.user.payload, especially its `id` field
  // UserId is the param in /users/:userId
  // We only allow user accessing herself, i.e. require payload.id==userId
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

export const createMongo = (req, res, next) => {
  // console.log(req.body);
  const login = new User({
    _id: new mongoose.Types.ObjectId(),
    publicAddress: req.body.publicAddress
    })
    login
        .save()
        .then(user => {
            res.json(user);
        })
        .catch(err => console.log(err));
    
}
export const patchMongo = (req, res, next) => {
  console.log("Fixing usernames")
  // Only allow to fetch current user
  if (req.user.payload.id != req.params.userId) {
    return res.status(401).send({
      error: 'You can can only access yourself'
    });
  }
  const findUser = User.findById(req.params.userId);
  
  return findUser.then(user => {
    if (!user) {
      return user;
    }

    Object.assign(user, req.body);
    return user.save();
  }).then(user => {
    return user ? res.json(user) : res.status(401).send({
      error: `User with publicAddress ${req.params.userId} is not found in database`
    });
  }).catch(next);
};











