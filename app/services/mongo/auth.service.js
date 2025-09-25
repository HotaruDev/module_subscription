import User from '../../api/v1/models/user.model.js';
import bcrypt from 'bcryptjs';
import { createToken } from '../../utils/jwt.js';
import { BadRequestError } from '../../errors/index.js';

export const register = async(req, session) => {
    const { username, email, password, confirmPassword } = req.body;

    if(password !== confirmPassword) throw new BadRequestError('Password and Confirm Password do not match');

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password || '', salt);

    const newUser = await User.create([{ username, email, password: hashedPassword }], {session});
    const token = createToken({id: newUser[0]._id});
    
    return { token, user: newUser[0] };
}

export const login = async (req) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user) throw new BadRequestError('Invalid email or password');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) throw new BadRequestError('Invalid email or password');
    
    const token = await createToken({id: user._id});
    return { token, user };
}

const logout = async(req) => {

}