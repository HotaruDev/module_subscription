import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: [true, 'username is already taken'],
        trim: true,
        minLength: 3,
        maxLenght: 15
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email is already in use'],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'please fill a valid email']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: 6
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;