import express from 'express';
import { register, login } from '../controllers/authController';
import { validateLoginInput, validateRegistrationInput } from '../middleware/inputValidation';

const router = express.Router();

router.post('/register', validateRegistrationInput, register);
router.post('/login', validateLoginInput, login);

export default router;
