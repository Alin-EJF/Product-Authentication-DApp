import express from "express";
import { NFCwrite} from "../controllers/NFC";
import { register, login, logout, profiletoken } from "../controllers/authController";
import {validateLoginInput, validateRegistrationInput} from "../middleware/inputValidation";

const router = express.Router();

router.post("/register", validateRegistrationInput, register);
router.post("/login", validateLoginInput, login);
router.post("/logout", logout);
router.post("/write-nfc", NFCwrite);
router.get("/profile", profiletoken);



export default router;
