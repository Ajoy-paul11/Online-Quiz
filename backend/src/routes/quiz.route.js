import { Router } from "express";
import { createQuiz, getQuiz, allQuiz, updateQuiz, deleteQuiz } from "../controllers/quiz.controller.js";


const router = Router()

router.route("/create").post(createQuiz)
router.route("/:id").get(getQuiz)
router.route("/").get(allQuiz)
router.route("/:id").patch(updateQuiz)
router.route("/:id").delete(deleteQuiz)


export default router;