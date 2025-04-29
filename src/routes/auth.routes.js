import express from "express";
import AuthController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", AuthController.registerUser); // Corrigido para usar registerUser

export default authRouter;
