import {getUser, getUsers} from '../../../services/mongo/user.service.js';

export const index = async(req, res, next) => {
    try {
        const users = await getUsers(req);
        res.status(200).json({ success: true, users })       
    } catch (error) {
        next(error)
    }
}

export const find = async(req, res, next) => {
    try {
        const user = await getUser(req);
        res.status(200).json({ success: true, user })
    } catch (error) {
        next(error)
    }
}