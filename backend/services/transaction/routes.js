import express from 'express';
import jwt from 'express-jwt';
import { config } from '../../constants.js';
import * as controller from './controller.js';
export const transactionRouter = express.Router();
/** GET /api/transaction/buy*/

transactionRouter.route('/update').post(controller.update);
/** POST /api/transaction/add*/

transactionRouter.route('/add').post(controller.add);
/** GET /api/transaction/findMin
 * finds min transaction by price per share
*/

transactionRouter.route('/findMin').get(controller.findMin);

/** GET /api/transaction/findAllBuyer
 * finds min transaction by price per share
*/
transactionRouter.route('/findAllBuyer').post(controller.findAllBuyer);
/** POST /api/transaction/findAllSeller
 * finds min transaction by price per share
*/
transactionRouter.route('/findAllSeller').post(controller.findAllSeller);


