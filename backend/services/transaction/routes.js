import express from 'express';
import jwt from 'express-jwt';
import { config } from '../../constants.js';
import * as controller from './controller.js';
export const transactionRouter = express.Router();
/** GET /api/transaction/buy*/

transactionRouter.route('/update').post(controller.update);
/** GET /api/dashboard/sell*/

transactionRouter.route('/add').get(controller.add);
/** POST /api/dashboard/buy*/

transactionRouter.route('/findMin').post(controller.findMin);


