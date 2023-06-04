import express from 'express';
import { forgotpassword, login, register, resetpassword } from './../controllers/authControllers.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/forgotpassword', forgotpassword);

router.put('/resetpassword/:resetToken', resetpassword);

export default router;