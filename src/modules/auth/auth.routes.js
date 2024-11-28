import express from "express";

import { login, logout, register } from "./auth.controller.js";


// EXTRACT AUTH ROUTER FROM EXPRESS
const authRouter = express.Router();

// AUTH ROUTES
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;