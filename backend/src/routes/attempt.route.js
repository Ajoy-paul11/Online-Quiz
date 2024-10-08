import { Router } from "express"
import { quizAttempt, fetchAttempt } from "../controllers/attempt.controller.js"



const router = Router()


router.route("/create").post(quizAttempt)
router.route("/:id").get(fetchAttempt)


export default router;