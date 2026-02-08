import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : String,
    type : {
        type : String,
        default : "CAFE"
    },
    admin :{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    openingTime : {
        type : String,
        default : "09:00",
    },
    closingTime : {
        type : String,
        default : "19:00"
    },
    slotDuration : {
        type : Number,
        default : 60
    }
}, {timestamps : true})

const Service = mongoose.model("Service", serviceSchema)

export default Service