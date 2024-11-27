import { Router } from 'express';

import listDriversController from '../controllers/listDriversController';

const driverRouter = Router();

driverRouter.get('/', listDriversController);

export default driverRouter;
