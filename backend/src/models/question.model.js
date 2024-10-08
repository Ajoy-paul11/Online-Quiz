import mongoose, { Schema } from "mongoose";


const questionSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    options: [
        {
            type: String,
            required: true
        }
    ],
    correctAnswer: {
        type: String,
        required: true
    },
    quizId: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
    }
})


export const Question = mongoose.model("Question", questionSchema)