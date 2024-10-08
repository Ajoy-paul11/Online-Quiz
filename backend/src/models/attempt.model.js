import mongoose, { Schema } from "mongoose"


const attemptSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    quizId: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    score: {
        type: Number,
        default: 0
    },
    percentage: {
        type: Number,
    },

}, { timestamps: true })


export const Attempt = mongoose.model("Attempt", attemptSchema)