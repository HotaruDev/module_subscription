import {Router} from 'express';
const userRouter = Router();

userRouter.get('/', (req, res) => res.status(200).send('GET all users'));
userRouter.post('/', (req, res) => res.status(201).send('CREATE new user'));
userRouter.get('/:id', (req, res) => res.status(200).send('GET user details'));
userRouter.put('/:id', (req, res) => res.status(200).send('UPDATE user'));
userRouter.delete('/:id', (req, res) => res.status(200).send('DELETE user'));

export default userRouter;