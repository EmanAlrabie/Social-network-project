import express from "express";
import {register, login, currentUser} from "../controllers/auth"
import {requireSignin} from '../middlewares/auth'

const router = express.Router(); //A Router instance is a complete middleware and routing system

//creates a routers
router.post("/register", register);
router.post("/login", login);
//in genral we can provide multiple callback functions that behave like middleware to handle a request. 
router.get("/current-user",requireSignin ,currentUser); //requireSignin is a middleware to handle a request.

module.exports = router