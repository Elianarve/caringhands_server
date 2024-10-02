import express from 'express';
import { getUser, deleteUser, createdUser, updateUser, getOneUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUser);

router.post('/', createdUser);

router.get('/:id',  getOneUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;