import express from 'express'
const app = express()
import cors from 'cors';
import { courseRoutes } from './modules/course/course.route';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import { categoryRoutes } from './modules/category/category.route';
import { reviewRoutes } from './modules/review/review.route';
import { userRoutes } from './modules/user/user.route';
import auth from './middlewares/auth';

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Welcome to the course review operations')
})

app.use('/api/auth', userRoutes)

app.use('/api/course', courseRoutes)
app.use('/api/courses', auth(), courseRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/courses', reviewRoutes)
app.use('/api/course', reviewRoutes)


app.use(globalErrorHandler)
app.use(notFound)

export default app;

