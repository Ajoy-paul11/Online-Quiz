import { Quiz } from "../models/quiz.model.js"
import { AsyncHandler } from "../utils/AsyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"


const createQuiz = AsyncHandler(async (req, res, next) => {
    const { title, description, timeLimit } = req.body
    if (!title || !description || !timeLimit) {
        const error = new ApiError(404, "All fields are required")
        next(error)
    }

    const newQuiz = await Quiz.create(
        { title, description, timeLimit }
    )

    return res.status(201).json(new ApiResponse(201, newQuiz, "Quiz is created successfully"))
})


const getQuiz = AsyncHandler(async (req, res, next) => {
    const quizId = req.params.id
    const quiz = await Quiz.findById(quizId).populate("questions")
    if (!quiz) {
        const error = new ApiError(404, "Invalid quizId")
        next(error)
    }

    return res.status(200).json(new ApiResponse(200, quiz, "Quiz data fetched successfully"))
})


const allQuiz = AsyncHandler(async (req, res, next) => {
    const quizzes = await Quiz.find({}).populate("questions")

    return res.status(200).json(new ApiResponse(200, quizzes, "All Quizzed fetched successfully"))
})


const updateQuiz = AsyncHandler(async (req, res, next) => {
    const quizId = req.params.id
    const { title, description, timeLimit } = req.body
    if (!title || !description || !timeLimit) {
        const error = new ApiError(404, "All fields are required")
        next(error)
    }

    const findQuiz = await Quiz.findById(quizId)
    if (!findQuiz) {
        const error = new ApiError(404, "Invalid quizId")
        next(error)
    }

    const updatedQ = await Quiz.findByIdAndUpdate(quizId, {
        $set: { description, title, timeLimit },
    },
        { new: true }
    )

    return res.status(201).json(new ApiResponse(201, updatedQ, "Quiz data updated successfully"))

})


const deleteQuiz = AsyncHandler(async (req, res, next) => {
    const quizId = req.params.id
    const findQuiz = await Quiz.findById(quizId)
    if (!findQuiz) {
        const error = new ApiError(404, "Invalid quizId")
        next(error)
    }

    await Quiz.findByIdAndDelete(quizId)

    return res.status(201).json(201, {}, "Quiz is deleted successfully")
})


export { createQuiz, getQuiz, allQuiz, updateQuiz, deleteQuiz }