import express from 'express';
import { loginUser, logoutUser, profileUser, registerUser } from '../controller/user.js';
import { checkAuth } from '../middleware/checkAuth.js';

const router=express.Router();

router.post("/auth/login",loginUser);

router.post("/auth/register",registerUser);

router.get("/auth/profile",checkAuth,profileUser);

router.get("/auth/logout",checkAuth,logoutUser);

export default router;
