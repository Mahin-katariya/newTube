import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

// data coming in json format ()
app.use(express.json({
    limit:"16kb"
}))
// data coming from url
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))
// storing files like pdf etc locally
app.use(express.static("public"))

// accessing user cookies and setting them securely
app.use(cookieParser())


// routes import

import userRouter from './routes/user.routes.js'



// routes declaration

app.use("/api/v1/users",userRouter)
// http://localhost:8000/api/v1/users



export {app}