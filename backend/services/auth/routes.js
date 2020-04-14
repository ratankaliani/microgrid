import express from 'express';
import * as controller from './controller.js';
import UserLogin from '../../models/userLogin.js'
import mongoose from 'mongoose';
import uri from '../../mondb.js'
export const authRouter = express.Router();
/** POST /api/auth */
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
authRouter.route('/').post(controller.createMongo);
