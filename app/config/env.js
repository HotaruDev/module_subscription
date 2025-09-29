import {config} from 'dotenv';
config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const {
    SERVER_URL,
    PORT, 
    NODE_ENV, 
    DB_URL, 
    JWT_SECRET_KEY, JWT_EXPIRES_IN,
    ARCJET_ENV, ARCJET_KEY,
    QSTASH_URL, QSTASH_TOKEN, QSTASH_CURRENT_SIGNING_KEY, QSTASH_NEXT_SIGNING_KEY,
    EMAIL_PASSWORD
} = process.env;