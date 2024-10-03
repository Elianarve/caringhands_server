import express from 'express';
import { getProfiles, getProfileById, createProfile, updateProfile, deleteProfile, getProfileByUserId } from '../controllers/profileController.js';

const router = express.Router();

router.get('/', getProfiles);
router.get('/:id', getProfileById);
router.post('/', createProfile);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);
router.get('/user/:userId', getProfileByUserId);

export default router;