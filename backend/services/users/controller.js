// import {NextFunction, Request, Response} from 'express';
import os from 'os';
import path from 'path';
import Sequelize from 'sequelize';
import user from "../../models/user.js";
import client from "../../mondb.js"




const sequelize = new Sequelize('login-with-metamask-database', '', undefined, {
  dialect: 'sqlite',
  storage: path.join(os.tmpdir(), 'db.sqlite'),
  logging: false
});
const User = user(sequelize, Sequelize);
export const find = (req, res, next) => {
  // If a query string ?publicAddress=... is given, then filter results
  const whereClause = req.query && req.query.publicAddress && {
    where: {
      publicAddress: req.query.publicAddress
    }
  };
  return User.findAll(whereClause).then(users => res.json(users)).catch(next);
};
export const get = (req, res, next) => {
  // AccessToken payload is in req.user.payload, especially its `id` field
  // UserId is the param in /users/:userId
  // We only allow user accessing herself, i.e. require payload.id==userId
  if (req.user.payload.id != req.params.userId) {
    console.log("WE AT THIS STATMENT", req.user.payload.id, req.params.userId);
    return res.status(401).send({
      error: 'You can can only access yourself'
    });
  }

  return User.findByPk(req.params.userId).then(user => res.json(user)).catch(next);
};
export const create = (req, res, next) => {
  console.log(req.body);
  //Push data to MongoDB
  client.connect(err => {
    if (err) throw err;
    const dbo = client.db("Users");
    var query = {};
    dbo.collection("Login/Password").find(query).toArray(function(err, result) {
      if (err) throw err;
      // console.log(result);
      
    });
    client.close();
  });
  User.create(req.body).then(user => res.json(user)).catch(next);
}
export const patch = (req, res, next) => {
  // Only allow to fetch current user
  if (req.user.payload.id != req.params.userId) {
    return res.status(401).send({
      error: 'You can can only access yourself'
    });
  }

  return User.findByPk(req.params.userId).then(user => {
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