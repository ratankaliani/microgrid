import sigUtil from 'eth-sig-util';
import ethUtil from 'ethereumjs-util'; // import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import os from 'os';
import path from 'path';
import Sequelize from 'sequelize';
import user from "../../models/user.js";
import { config } from '../../constants.js';
import uri from "../../mondb.js"
import mongoose from 'mongoose';
import UserLogin from '../../models/userLogin.js';

//Connect to mongoose
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

export const createMongo = (req, res, next) => {
  const {
    signature,
    publicAddress
  } = req.body;
  if (!signature || !publicAddress) return res.status(400).send({
    error: 'Request should have signature and publicAddress'
  });
  var query = {"publicAddress": publicAddress}
  return UserLogin.findOne(query) 
  ////////////////////////////////////////////////////
  // Step 1: Get the user with the given publicAddress
  ////////////////////////////////////////////////////
  .then(user => {
    if (!user) return res.status(401).send({
      error: `User with publicAddress ${publicAddress} is not found in database`
    });
    return user;
  }) ////////////////////////////////////////////////////
  // Step 2: Verify digital signature
  ////////////////////////////////////////////////////
  .then(user => {
    if (!(user instanceof UserLogin)) {
      // Should not happen, we should have already sent the response
      throw new Error('User is not defined in "Verify digital signature".');
    }

    const msg = `I am signing my one-time nonce: ${user.nonce}`; // We now are in possession of msg, publicAddress and signature. We
    // will use a helper from eth-sig-util to extract the address from the signature

    const msgBufferHex = ethUtil.bufferToHex(Buffer.from(msg, 'utf8'));
    const address = sigUtil.recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature
    }); // The signature verification is successful if the address found with
    // sigUtil.recoverPersonalSignature matches the initial publicAddress

    if (address.toLowerCase() === publicAddress.toLowerCase()) {
      return user;
    } else {
      return res.status(401).send({
        error: 'Signature verification failed'
      });
    }
  }) ////////////////////////////////////////////////////
  // Step 3: Generate a new nonce for the user
  ////////////////////////////////////////////////////
  .then(user => {
    if (!(user instanceof UserLogin)) {
      // Should not happen, we should have already sent the response
      throw new Error('User is not defined in "Generate a new nonce for the user".');
    }

    user.nonce = Math.floor(Math.random() * 10000);
    return user.save();
  }) ////////////////////////////////////////////////////
  // Step 4: Create JWT
  ////////////////////////////////////////////////////
  .then(user => {
    return new Promise((resolve, reject) => // https://github.com/auth0/node-jsonwebtoken
    jwt.sign({
      payload: {
        id: user.id,
        publicAddress
      }
    }, config.secret, {}, (err, token) => {
      if (err) {
        return reject(err);
      }

      return resolve(token);
    }));
  }).then(accessToken => res.json({
    accessToken
  })).catch(next);
};



const sequelize = new Sequelize('login-with-metamask-database', '', undefined, {
  dialect: 'sqlite',
  storage: path.join(os.tmpdir(), 'db.sqlite'),
  logging: false
});
const User = user(sequelize, Sequelize);


export const create = (req, res, next) => {
  const {
    signature,
    publicAddress
  } = req.body;
  if (!signature || !publicAddress) return res.status(400).send({
    error: 'Request should have signature and publicAddress'
  });
  return User.findOne({
    where: {
      publicAddress
    }
  }) ////////////////////////////////////////////////////
  // Step 1: Get the user with the given publicAddress
  ////////////////////////////////////////////////////
  .then(user => {
    if (!user) return res.status(401).send({
      error: `User with publicAddress ${publicAddress} is not found in database`
    });
    return user;
  }) ////////////////////////////////////////////////////
  // Step 2: Verify digital signature
  ////////////////////////////////////////////////////
  .then(user => {
    if (!(user instanceof User)) {
      // Should not happen, we should have already sent the response
      throw new Error('User is not defined in "Verify digital signature".');
    }

    const msg = `I am signing my one-time nonce: ${user.nonce}`; // We now are in possession of msg, publicAddress and signature. We
    // will use a helper from eth-sig-util to extract the address from the signature

    const msgBufferHex = ethUtil.bufferToHex(Buffer.from(msg, 'utf8'));
    const address = sigUtil.recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature
    }); // The signature verification is successful if the address found with
    // sigUtil.recoverPersonalSignature matches the initial publicAddress

    if (address.toLowerCase() === publicAddress.toLowerCase()) {
      return user;
    } else {
      return res.status(401).send({
        error: 'Signature verification failed'
      });
    }
  }) ////////////////////////////////////////////////////
  // Step 3: Generate a new nonce for the user
  ////////////////////////////////////////////////////
  .then(user => {
    if (!(user instanceof User)) {
      // Should not happen, we should have already sent the response
      throw new Error('User is not defined in "Generate a new nonce for the user".');
    }

    user.nonce = Math.floor(Math.random() * 10000);
    return user.save();
  }) ////////////////////////////////////////////////////
  // Step 4: Create JWT
  ////////////////////////////////////////////////////
  .then(user => {
    return new Promise((resolve, reject) => // https://github.com/auth0/node-jsonwebtoken
    jwt.sign({
      payload: {
        id: user.id,
        publicAddress
      }
    }, config.secret, {}, (err, token) => {
      if (err) {
        return reject(err);
      }

      return resolve(token);
    }));
  }).then(accessToken => res.json({
    accessToken
  })).catch(next);
};