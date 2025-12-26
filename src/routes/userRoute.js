import { registerUser, loginUser} from "../controllers/userController.js";
import express from "express";

const router = express.Router();

//Register user route
router.post("/register", registerUser);

//Login user route
router.post("/login", loginUser);

export default router;