
/*
* All the created file for route will be imported here
*
*/
import express from 'express';

import userRouter from './user';
import bookRouter from './book';


const router = express.Router();

router.use('/', userRouter);
router.use('/', bookRouter);


export default router;
