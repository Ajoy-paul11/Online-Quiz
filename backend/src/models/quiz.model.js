import mongoose, { Schema } from "mongoose";


const quizSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timeLimit: {
        type: Number,
        required: true
    },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Question"
        }
    ]

})


export const Quiz = mongoose.model("Quiz", quizSchema)