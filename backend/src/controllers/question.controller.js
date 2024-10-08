import { Quiz } from "../models/quiz.model.js"
import { Question } from "../models/question.model.js"
import { AsyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const createQuestion = AsyncHandler(async (req, res, next) => {

    const { text, correctAnswer, option1, option2, option3, quizId } = req.body
    if (!text || !correctAnswer || !option1 || !option2 || !option3 || !quizId) {
        const error = new ApiError(404, "All fields are required")
        return next(error)
    }
    const options = [option1, option2, option3]

    const getQuiz = await Quiz.findById(quizId)
    if (!getQuiz) {
        const error = new ApiError(404, "Quiz not found")
        return next(error)
    }

    const addQuestion = await Question.create(
        { text, options, correctAnswer, quizId }
    )

    if (addQuestion) {
        // getQuiz.questions.push(addQuestion._id)
        // await getQuiz.save({ validateBeforeSave: false })
        await Quiz.findByIdAndUpdate(quizId, { $push: { questions: addQuestion._id } })
    }


    return res.status(201).json(
        new ApiResponse(201, addQuestion, "Question is created successfully")
    )
})


const getQuestions = AsyncHandler(async (req, res, next) => {
    const quizId = req.params.id
    const getQuiz = await Quiz.findById(quizId)
    if (!getQuiz) {
        const error = new ApiError(404, "Quiz not found")
        return next(error)
    }
    const questions = await Question.find({ quizId })

    return res.status(200).json(new ApiResponse(200, questions, "Questions are fetched successfully"))
})


const updateQuestion = AsyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { text, correctAnswer } = req.body
    if (!text || !correctAnswer) {
        const error = new ApiError(404, "All fields are required")
        return next(error)
    }
    const question = await Question.findById(id)
    if (!question) {
        const error = new ApiError(404, "Question not exist")
        return next(error)
    }

    const updatedQues = await Question.findByIdAndUpdate(
        id,
        { $set: { text, correctAnswer } },
        { new: true }
    )

    return res.status(201).json(new ApiResponse(201, updatedQues, "Question is updated successfully"))
})


const deleteQuestion = AsyncHandler(async (req, res, next) => {
    const { id } = req.params
    await Question.findByIdAndDelete(id)

    return res.status(200).json(new ApiResponse(200, {}, "Question is deleted successfully"))

})


export { createQuestion, getQuestions, updateQuestion, deleteQuestion }