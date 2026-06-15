import { Router } from "express";
import { userControllers } from "./user.controllers";

const router  = Router();


router.post('/', userControllers.createUser);
router.get('/', userControllers.getAllUsers);
router.get('/:id', userControllers.getUsersbyId);
router.put('/:id', userControllers.updateUserById);
router.delete('/:id', userControllers.deleteUserById);


export default router;