import express from "express";
import {register, login, currentUser} from "../controllers/auth"
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/current-user", currentUser);

module.exports = router