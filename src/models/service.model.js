import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : String,
    type : {
        type : String,
        enum : ["CAFE", "DOCTOR", "SALON"],
        default : "CAFE"
    },
    admin :{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    openingTime : {
        type : String,
        default : "09:00"
    },
    closingTime : {
        type : String,
        default : "19:00"
    }
}, {timestamps : true})

const Service = mongoose.model("Service", serviceSchema)

export default Service