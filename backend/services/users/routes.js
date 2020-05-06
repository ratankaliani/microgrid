import express from 'express';
import jwt from 'express-jwt';
import { config } from '../../constants.js';
import * as controller from './controller.js';
export const userRouter = express.Router();
/** GET /api/users CHECK*/

userRouter.route('/').get(controller.findMongo);
/** POST /api/users/update
 * include all args to be updated as POST request
 * make sure that publicAddress in included*/

userRouter.route('/update').post(controller.updateUser);
/** GET /api/users/:userId */

/** Authenticated route */

userRouter.route('/:userId').get(jwt({
  secret: config.secret
}), controller.getMongo);

/** GET /api/users/updateBuy:userId */

/** Authenticated route */

userRouter.route('/updateBuy:userId').get(jwt({
  secret: config.secret
}), controller.getMongo);
/** POST /api/users CHECK*/ 

userRouter.route('/').post(controller.createMongo);
/** PATCH /api/users/:userId */

/** Authenticated route */

userRouter.route('/:userId').patch(jwt({
  secret: config.secret
}), controller.patchMongo);