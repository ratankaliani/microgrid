import express from 'express';
import jwt from 'express-jwt';
import { config } from '../../constants.js';
import * as controller from './controller.js.js';
export const walletRouter = express.Router();
/** GET /api/wallet CHECK*/

walletRouter.route('/').get(controller.findMongo);
/** GET /api/wallet/:userId */

/** Authenticated route */

walletRouter.route('/:userId').get(jwt({
  secret: config.secret
}), controller.getMongo);
/** POST /api/wallet CHECK*/ 

walletRouter.route('/').post(controller.createMongo);
/** PATCH /api/wallet/:userId */

/** Authenticated route */

walletRouter.route('/:userId').patch(jwt({
  secret: config.secret
}), controller.patchMongo);