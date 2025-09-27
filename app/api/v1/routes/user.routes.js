import {Router} from 'express';
const userRouter = Router();
import { find, index } from '../controllers/user.controller.js';
import {authorize} from '../../../middlewares/auth.middleware.js';

userRouter.get('/', authorize, index);
userRouter.post('/', (req, res) => res.status(201).send('CREATE new user'));
userRouter.get('/:id', authorize, find);
userRouter.put('/:id', (req, res) => res.status(200).send('UPDATE user'));
userRouter.delete('/:id', (req, res) => res.status(200).send('DELETE user'));

export default userRouter;