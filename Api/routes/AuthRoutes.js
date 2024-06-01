import express from 'express';
import { signup, login, adminLogin } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/admin-login', adminLogin);

export default router;
