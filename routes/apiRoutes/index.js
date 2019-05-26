
/*
* All the created file for route will be imported here
*
*/
import express from 'express';

import userRouter from './user';

const router = express.Router();

router.use('/', userRouter);

export default router;
