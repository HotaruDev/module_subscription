import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// routes
import authRouter from './app/api/v1/routes/auth.routes.js';
import userRouter from './app/api/v1/routes/user.routes.js';
import subscriptionRoutes from './app/api/v1/routes/subscription.routes.js';

// middleware
import errorMiddleware from './app/middlewares/error.middleware.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => res.status(200).json({status: 'success', message: 'welcome to subscription module API', author: 'Hotaru Jun', name: 'module_subscription', version: '0.0.1', docs_link: '', health_check: 100, is_open: true}));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRoutes);

app.use(errorMiddleware)

export default app;
