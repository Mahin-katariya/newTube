// import { DB_NAME } from "./constants";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
});

// approach-2 connect the db in db/index.js
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000,() => {
        console.log(`Server is running at port : ${process.env.PORT || 8000}`);
        
    })
})
.catch((err) => {
    console.error("MongoDB connection failed! : ",err);
    
})

















//approach-1 where we connect the db in index.js itself using iife(immediately invoked function expression) 

/*import express from "express"
const app = express();
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error",(error) => {
            console.log("Errr: ",error);
            throw error
        })

        app.listen(process.env.PORT,() => {
            console.log("App is listening on port: ",process.env.PORT);
            
        })
    } catch (error) {
        console.error("ERRR: ",error);
        throw error;
        
    }
})()
*/