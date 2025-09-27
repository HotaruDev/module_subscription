import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from '../config/env.js';

export const createToken = (payload) => jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
export const isTokenValid = (token) => jwt.verify(token, JWT_SECRET_KEY);