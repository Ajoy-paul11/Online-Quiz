import express from "express"
import cors from "cors"
import { errorController } from "./controllers/errorController.js"


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "*", credentials: true }))


// import all routes
import userRouter from "./routes/auth.route.js"
import questionRouter from "./routes/question.route.js"
import quizRouter from "./routes/quiz.route.js"
import attemptRouter from "./routes/attempt.route.js"



// declare all routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/questions", questionRouter)
app.use("/api/v1/quiz", quizRouter)
app.use("/api/v1/attempt", attemptRouter)


app.use(errorController)


export { app }