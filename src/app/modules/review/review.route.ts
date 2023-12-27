import express from 'express';
import { reviewControllers } from './review.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router()

router.post('/', auth(USER_ROLE.USER), reviewControllers.createReview)
router.get('/:courseId/reviews', auth(), reviewControllers.getCourseDetails)
router.get('/best', auth(), reviewControllers.bestCourse)
export const reviewRoutes = router