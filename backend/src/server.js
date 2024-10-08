import { app } from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/index.js";


dotenv.config(
    { path: "./.env" }
)


connectDB()
    .then(() => {
        app.on("error", (err) => {
            console.error("ERROR: ", err)
        })

        app.listen(process.env.PORT || 5001, () => {
            console.log(`App is listening on Port ${process.env.PORT}`);
        })

    }).catch((err) => {
        console.log("Failed connecting to database", err.message)
        console.error("Connection failed", err)
    })


app.get("/", (req, res) => {
    return res.send("Authentication and Error handling side.");

})