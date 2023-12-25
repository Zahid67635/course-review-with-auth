import express from 'express';
import { courseControllers } from './course.controller';
const router = express.Router()

router.post('/', courseControllers.createCourse)
router.get('/', courseControllers.getAllCourses)
router.put('/:id', courseControllers.updateCourse)

export const courseRoutes = router