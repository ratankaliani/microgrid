import express from 'express';
import * as controller from './controller.js';
import User from '../../models/user.js'
import mongoose from 'mongoose';
import uri from '../../mondb.js'
export const authRouter = express.Router();
/** POST /api/auth */
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
authRouter.route('/').post(controller.createMongo);
