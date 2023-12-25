import express from 'express';
import { reviewControllers } from './review.controller';
const router = express.Router()

router.post('/', reviewControllers.createReview)
router.get('/:courseId/reviews', reviewControllers.getCourseDetails)
router.get('/best', reviewControllers.bestCourse)
export const reviewRoutes = router