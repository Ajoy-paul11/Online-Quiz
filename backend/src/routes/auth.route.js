import { Router } from "express"
import { registerUser, loginUser, getSingleUser } from "../controllers/user.controller.js"


const router = Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/:id").get(getSingleUser)


export default router;