import express from 'express';
import post from './post';
//import account from './account';

const router = express.Router();
//router.use('/account', account);
router.use('/post',post);

export default router;
