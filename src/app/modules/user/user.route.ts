import express from 'express';
import { userControllers } from './user.controller';
import auth from '../../middlewares/auth';
const router = express.Router()

router.post('/register', userControllers.createAUser)
router.post('/login', userControllers.loginUser)
router.post('/change-password', auth(), userControllers.changePassword)

export const userRoutes = router