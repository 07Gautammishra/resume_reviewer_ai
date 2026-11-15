import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/\S+@\S+\.\S+/, 'is invalid'],
            index: true,
        },
        password: {
            type: String,
            required: false,
            select: false,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 80,
        },
        avatar: {
            type: String,
            default: "",
            trim: true,
        },
        googleId: {
            type: String,
            sparse: true,
            index: true,
        },
        githubId: {
            type: String,
            sparse: true,
            index: true,
        },
        authProvider: {
            type: String,
            enum: ["local", "google", "github"],
            default: "local",
        },
    },
    {
        timestamps: true,
    }
);
userSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 12);
}
userSchema.methods.comparePassword = function (pin) {
    if (!this.password) return false;
    return bcrypt.compare(pin, this.password);
}
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    return obj;
}
export default mongoose.model('User', userSchema);