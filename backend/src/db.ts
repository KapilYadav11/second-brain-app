import mongoose, { Model, Schema } from 'mongoose';
import env from 'dotenv';

mongoose.connect("MONGODB_URL");

const UserSchema = new Model ({
    username: {
        type: String,
        unique: true
    },
    password: String

})

export const UserModel = mongoose.model("User", UserSchema)