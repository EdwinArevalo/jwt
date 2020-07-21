import {Router} from 'express';
const router:Router = Router();

import AuthController from '../controllers/auth.controller';
const { signUp, signIn, profile} = AuthController;

router.post('/signup', signUp)
.post('/signin', signIn)
.get('/profile', profile);

export default router; 