import express from 'express';
import { userControllers } from './user.controller';
const router = express.Router()

router.post('/register', userControllers.createAUser)

export const userRoutes = router