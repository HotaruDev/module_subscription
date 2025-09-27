import mongoose from "mongoose";
import {DB_URL, NODE_ENV} from '../config/env.js';

if(!DB_URL) throw new Error('Please define the DB_URL environment variable inside .env.<development/production>.local');

mongoose.connect(DB_URL)
    .then(() => console.log(`Connected to database in ${NODE_ENV} mode`))
    .catch((err) => {
        console.error('Error connecting to database : ', err);
        process.exit(1);
    });

const db = mongoose.connection;

export default db;