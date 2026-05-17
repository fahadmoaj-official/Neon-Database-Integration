import express from 'express';
import { createUser ,getAllUsers, getUsersbyId,updateUserById,DeleteUserById} from '../controllers/userControllers';
const router = express();

router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUsersbyId);
router.put('/users/:id', updateUserById);
router.delete('/users/:id', DeleteUserById);

export default router;