import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";


const router = Router()

router.route("/register").post(
    //fields is used instead of array because we taking files from different input fields not just a single input field, array is used when multiple files are to be taken from a single input field
    upload.fields([
        {
            name: "avatar",
            maxCount:1
        },
        {
            name: "coverImage",
            maxCount:1
        }
    ]),
    registerUser)
// http://localhost:8000/api/v1/users/register



export default router