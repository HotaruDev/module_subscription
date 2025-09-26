import User from '../../api/v1/models/user.model.js';
import { NotFoundError } from '../../errors/index.js';

export const getUsers = async(req) => {
    const users = await User.find().select('-password');
    return users;
}

export const getUser = async(req) => {
    const user = await User.findById(req.params.id).select('-password');

    if(!user) throw new NotFoundError('User not found');
    return user;
}