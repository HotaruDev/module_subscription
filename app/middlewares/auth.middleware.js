import User from "../api/v1/models/user.model.js";
import { UnauthenticatedError } from "../errors/index.js";
import { isTokenValid } from "../utils/jwt.js";

export const authorize = async(req, res, next) => {
    try {
        let token;
    
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
    
        if(!token) throw new UnauthenticatedError('invalid authentication');
    
        const decoded = isTokenValid(token);
        const user = await User.findById(decoded.id)
    
        if(!user) throw new UnauthenticatedError('invalid authentication');
        req.user = user;
    
        next();
    } catch (error) {
        next(error);
    }
}