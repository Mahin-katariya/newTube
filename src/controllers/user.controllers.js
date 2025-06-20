import { asyncHandler } from "../utils/asyncHandler.js"; 
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req,res) => {
 // 1) get user details from frontend
 // 2) validation - not empty
 // 3) check if already exists check username and email or just one of em
 // 4) check for images, check for avatar(required)
 // 5) upload them to cloudinary
 // 6) create user object - create entry in db
 // 7) remove password and refresh token field from response
 // 8) check for user creation
 // 9) return response else return error if there was a problem in creation

    // collecting data from user
    const {fullname,username,email,password} = req.body;
    // console.log(`username:${username} and password: ${password}`);

    /* 
    if(fullname.trim() === "" || username.trim() === "" || email.trim() === "" || password.trim() === ""){
        throw new ApiError(401,"all fields are required to be filled!");
     }
    */
    // validating - not empty
    if(
        [fullname,username,email,password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(401,"All fields are required");
    }

    // check if user already exists
    const existingUser = await User.findOne({ //used await because this method returns a promise which if not handled will provide a truthy value as a promise is a truthy value which will cause existing user to always exist
        $or:[{ username },{ email }]
    })
    // console.log(`\n ${existingUser}`);
    if(existingUser) throw new ApiError(409,"User with this username or email exists");
    
    // check for images especially avatar is required
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    console.log(`\n ${req.files?.avatar[0]?.path}`);

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required");
    }
    
    //upload the images to cloudinary

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar) {
        throw new ApiError(400,"Avatar file is required");
    }

    //create object kon db se baat karra? user!
    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) throw new ApiError(500,"Internal Server Error : Something went wrong while registering the user")

    return res.status(201).json(
        new ApiResponse(201,createdUser,"User registered succesfully")
    )



})




export {registerUser}
