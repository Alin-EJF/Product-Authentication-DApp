import express from "express";
import { NFCwrite} from "../controllers/NFC";
import { report } from "../controllers/report";
import { register, login, logout, profiletoken } from "../controllers/authController";
import {validateLoginInput, validateRegistrationInput} from "../middleware/inputValidation";

const router = express.Router();

router.post("/register", validateRegistrationInput, register);
router.post("/login", validateLoginInput, login);
router.post("/logout", logout);
router.get("/profile", profiletoken);
router.post("/write-nfc", NFCwrite);
router.post("/product-report", report);
router.post("/provider-report", report);
router.get("/provider-report", report);
router.get("/product-report", report);



export default router;
