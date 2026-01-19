import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto"

const userSchema = new Schema({
    avatar : {
        url : String,
        publicId : String
    },
    fullName : {
        type : String,
        required : true,
        unique : false
    },
    email : {
        type : String,
        required : true,
        unique: true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    role : {
        type : String,
        enum : hi,
        default : hi,
    },
    isEmailVerified : {
        type : Boolean,
        default : false
    },
    emailVerificationUrl : {
        type : String
    },
    emailVerificationUrlExpiry : {
        type : Date
    },
    forgotPasswordUrl : {
        type : String
    },
    forgotPasswordUrlExpiry : {
        type : Date
    },
    refreshToken : {
        type : String
    },
    refreshTokenExpiry : {
        type : String
    }
}, {timestamps : true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.generateTemporaryToken = function(){
    const unhashedToken = crypto.randomBytes(256).toString("hex")

    const hashedToken = crypto.hash("sha256").update(unhashedToken).digest("hex")
    const tokenExpiry = Date.now() + (24*60*60*1000)

    return {unhashedToken, hashedToken, tokenExpiry}
}

userSchema.methods.isPasswordCorrect = async function
 (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id : this._id,
            email: this.email,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn : process.env.REFRESH_TOKEN_EXPIRY}
    )
}

const User = mongoose.model("User", userSchema)

export default User
