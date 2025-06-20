import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true //to enable searching in a more optimised way
    },
    username: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname: {
        type:String,
        required:true,
        trim:true
    },
    avatar: {
        type:String, //url of cloudinary
        required:true
    },
    coverImage: {
        type:String, 
    },
    watchHistory : [{
        type:Schema.Types.ObjectId,
        ref:"Video"
    }],
    password: {
        type:String,
        required:[true,'Password is required']
    },
    refreshToken: {
        type:String
    }
},{timestamps:true})

userSchema.pre("save", async function(next) { //pre-hook
    // if the password is field is modified only then we should encrypt and save the encryption rather than repeating the same process when other fields are also modified
    if(this.isModified("password")){ 
        this.password = bcrypt.hash(this.password,12)
            next()
    }   
})

// checking the password stored in database is same as the password provided by the user during login
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
    // password stored in database and this.password is the password provided by user that is normal text   
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function(){
return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const  User = mongoose.model("User",userSchema)