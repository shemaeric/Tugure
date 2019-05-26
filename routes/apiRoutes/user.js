/*
* The routes will be here
*
*/
import express from 'express';
import dotenv from 'dotenv';
import userController from '../../controllers/user';
import tokenVerify from '../../middlewares/customPass';

dotenv.config();


const router = express.Router({});

router.post('/auth/signup', userController.createUserLocal);
router.post('/auth/signin', userController.login);

// for testing the passport authentication of the JWT token
router.get('/test', tokenVerify.checkToken, (req, res) => {
  res.send({ message: 'hello' });
});

export default router;
