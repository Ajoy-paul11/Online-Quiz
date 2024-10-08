import { Router } from "express";
import { createQuestion, getQuestions, updateQuestion, deleteQuestion } from "../controllers/question.controller.js";

const router = Router()


router.route("/create").post(createQuestion)
router.route("/:id").get(getQuestions)
router.route("/:id").patch(updateQuestion)
router.route("/:id").delete(deleteQuestion)


export default router;