import express from 'express';
import { categoryControllers } from './category.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router()

router.post('/', auth(USER_ROLE.ADMIN), categoryControllers.createCategory)
router.get('/', categoryControllers.getCategories)

export const categoryRoutes = router