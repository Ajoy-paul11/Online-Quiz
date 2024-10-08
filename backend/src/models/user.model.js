import mongoose from "mongoose"
import bcrypt from "bcrypt"



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
    }
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})


userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


export const User = mongoose.model('User', userSchema)