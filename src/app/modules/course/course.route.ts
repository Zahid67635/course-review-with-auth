import express from 'express';
import { courseControllers } from './course.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router()

router.post('/', auth(USER_ROLE.ADMIN), courseControllers.createCourse)
router.get('/', courseControllers.getAllCourses)
router.put('/:id', courseControllers.updateCourse)

export const courseRoutes = router