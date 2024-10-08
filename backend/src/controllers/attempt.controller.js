import { Attempt } from "../models/attempt.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { Question } from "../models/question.model.js"



const quizAttempt = AsyncHandler(async (req, res, next) => {
    const { quizId, userId, answers } = req.body

    let score = 0
    let totalAnswer = answers.length

    for (let answer of answers) {
        const question = await Question.findById(answer.questionId)
        if (question.correctAnswer === answer.selectedAnswer) {
            score++;
        }
    }

    const percentage = score / totalAnswer * 100

    const addAttempt = await Attempt.create(
        { score, percentage, userId, quizId }
    )

    return res.status(201).json(new ApiResponse(201, addAttempt, "Quiz attempted successfully"))
})


const fetchAttempt = AsyncHandler(async (req, res, next) => {
    const userId = req.params.id

    const getAttempt = await Attempt.find({ userId })
    if (!getAttempt) {
        const error = new ApiError(404, "Can't find the attempt")
        return next(error)
    }

    return res.status(200).json(new ApiResponse(200, getAttempt, "Attempt fetched successfully"))

})


export { quizAttempt, fetchAttempt }