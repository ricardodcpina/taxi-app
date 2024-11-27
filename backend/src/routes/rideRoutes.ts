import { Router } from 'express';

import estimateRideController from '../controllers/estimateRideController';
import confirmRideController from '../controllers/confirmRideController';
import generateMapRideController from '../controllers/generateMapRideController';
import listRidesController from '../controllers/listRidesController';

const driverRouter = Router();

driverRouter.post('/estimate', estimateRideController);
driverRouter.patch('/confirm', confirmRideController);
driverRouter.get('/static_map', generateMapRideController);
driverRouter.get('/:customer_id', listRidesController);

export default driverRouter;
