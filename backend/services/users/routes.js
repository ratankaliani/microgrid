import express from 'express';
import jwt from 'express-jwt';
import { config } from '../../constants.js';
import * as controller from './controller.js';
export const userRouter = express.Router();
/** GET /api/users CHECK*/

userRouter.route('/').get(controller.findMongo);
/** GET /api/users/:userId */

/** Authenticated route */

userRouter.route('/:userId').get(jwt({
  secret: config.secret
}), controller.getMongo);
/** POST /api/users CHECK*/ 

userRouter.route('/').post(controller.createMongo);
/** PATCH /api/users/:userId */

/** Authenticated route */

userRouter.route('/:userId').patch(jwt({
  secret: config.secret
}), controller.patchMongo);