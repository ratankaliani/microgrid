import express from 'express';

import * as controller from './controller.js';

export const authRouter = express.Router();

/** POST /api/auth */
authRouter.route('/').post(controller.create);