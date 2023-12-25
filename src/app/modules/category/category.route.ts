import express from 'express';
import { categoryControllers } from './category.controller';
const router = express.Router()

router.post('/', categoryControllers.createCategory)
router.get('/', categoryControllers.getCategories)

export const categoryRoutes = router