import express from 'express';
import auth from '../middleware/authMiddleware.js';
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUserProfile,
  getUserConnection,
  addRemoveConnection,
  // deleteUsers
} from '../controllers/userControllers.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', auth, getUser);
router.get('/:id/connection', auth, getUserConnection)
router.post('/', createUser);
router.put('/update_user', auth, updateUserProfile);
router.put('/:id/:connectionId', auth, addRemoveConnection);
router.delete('/:id', deleteUser);
// router.delete('/', deleteUsers);

export default router;