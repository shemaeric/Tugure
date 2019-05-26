import express from 'express';
import apiRouter from './apiRoutes';


const router = express.Router();

router.use('/api/v1', apiRouter);

export default router;
