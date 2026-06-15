import {Router} from "express";
import { authController } from "./auth.controllers";
const router = Router();

router.post('/login', authController.loginUser);
router.post('/refresh-token', authController.refreshToken);


export default router;