import mongoose from "mongoose";
import { login, register } from "../../../services/mongo/auth.service.js";

export const signUp = async(req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const data = await register(req, session);

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({ success: true, message: 'User created successfully', data });
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}

export const signIn = async(req, res, next) => {
    try {
        const data = await login(req);
        res.status(200).json({ success: true, message: 'User logged in successfully', data });
    } catch (error) {
        next(error)
    }
}

export const signOut = async(req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}