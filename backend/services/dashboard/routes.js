import express from 'express';
import jwt from 'express-jwt';
import { config } from '../../constants.js';
import * as controller from './controller.js';
export const dashboardRouter = express.Router();
/** GET /api/dashboard/buy*/

dashboardRouter.route('/buy').get(controller.buy);
/** GET /api/dashboard/sell*/

dashboardRouter.route('/sell').get(controller.sell);
/** POST /api/dashboard/buy*/

dashboardRouter.route('/buy').post(controller.changeBuy);
/** POST /api/dashboard/sell*/

dashboardRouter.route('/sell').post(controller.changeSell);




/** GET /api/dashboard/buy/:transactionId */

/** Authenticated route */

dashboardRouter.route('buy/:transactionId').get(jwt({
  secret: config.secret
}), controller.getBuyTransaction);
/** GET /api/dashboard/sell/:transactionId */

/** Authenticated route */

dashboardRouter.route('sell/:transactionId').get(jwt({
  secret: config.secret
}), controller.getSellTransactions);

/** POST /api/dashboard/buy*/ 

dashboardRouter.route('/buy').post(controller.addBuy);
/** POST /api/dashboard/buy*/ 

dashboardRouter.route('/sell').post(controller.addSell);
/** PATCH /api/dashboard/buy/:transactionId */

/** Authenticated route */

dashboardRouter.route('/buy/:transactionId').patch(jwt({
  secret: config.secret
}), controller.patchBuy);
/** PATCH /api/dashboard/sell/:transactionId */

/** Authenticated route */

dashboardRouter.route('/sell/:transactionId').patch(jwt({
  secret: config.secret
}), controller.patchSell);