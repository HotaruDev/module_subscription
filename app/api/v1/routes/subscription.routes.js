import {Router} from 'express';
const subscriptionRouter = Router()
import {authorize} from '../../../middlewares/auth.middleware.js'
import { create, usersubs } from '../controllers/subscription.controller.js';

subscriptionRouter.get('/user/:id', authorize, usersubs);
subscriptionRouter.post('/', authorize, create);

export default subscriptionRouter;