import express from 'express';
import * as controller from './controller.js';
import UserLogin from '../../models/userLogin.js'
import mongoose from 'mongoose';
import uri from '../../mondb.js'
export const authRouter = express.Router();
/** POST /api/auth */
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
authRouter.route('/').post(controller.create);

/** POST /api/auth/Microgrid */
authRouter.route('/Microgrid').post((req, res, next) => {
    const login = new UserLogin({
        _id: new mongoose.Types.ObjectId(),
        publicAddress: req.body.publicAddress,
        nonce: req.body.nonce,
        username: req.body.username
    
    })
    login
        .save()
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: "Handling post request to api/auth/Microgrid",
        createdLogin: login
    });
});