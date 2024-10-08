import { User } from "../models/user.model.js"
import { AsyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"



const registerUser = AsyncHandler(async (req, res, next) => {
    const { username, email, password, role } = req.body
    if (!username || !email || !password || !role) {
        const error = new ApiError(401, "All fields are required")
        return next(error)
    }

    const checkUser = await User.findOne({ email }).select("-password")
    if (checkUser) {
        const error = new ApiError(404, "User already exist!")
        return next(error)
    }

    const newUser = await User.create(
        { username, email, password, role }
    )

    const userWithoutPassword = await User.findById(newUser._id).select('-password');


    return res.status(201).json(
        new ApiResponse(201, userWithoutPassword, "User registered successfully")
    )

}
)


const loginUser = AsyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        const error = new ApiError(401, "All fields are required")
        return next(error)
    }

    const getUser = await User.findOne({ email })
    if (!getUser) {
        const error = new ApiError(404, "User not found!")
        return next(error)
    }

    const isPasswordCorrect = await getUser.checkPassword(password)
    if (!isPasswordCorrect) {
        const error = new ApiError(404, "Invalid credentials")
        return next(error)
    }

    return res.status(201).json(
        new ApiResponse(201, getUser, "User registered successfully")
    )

}
)


const getSingleUser = AsyncHandler(async (req, res, next) => {
    const { id } = req.params

    const userDetails = await User.findById(id).select("-password")
    if (!userDetails) {
        const error = new ApiError(404, "User not found!")
        return next(error)
    }

    return res.status(200).json(new ApiResponse(200, userDetails, "User details fetched successfully"))
})


export { registerUser, loginUser, getSingleUser } 