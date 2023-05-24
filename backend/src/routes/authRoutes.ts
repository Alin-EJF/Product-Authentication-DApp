import express from "express";
import { register, login, logout, profiletoken } from "../controllers/authController";
import {validateLoginInput, validateRegistrationInput} from "../middleware/inputValidation";

const router = express.Router();

router.post("/register", validateRegistrationInput, register);
router.post("/login", validateLoginInput, login);
router.post("/logout", logout);
router.get("/profile", profiletoken);


export default router;
