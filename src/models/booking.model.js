import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    resource : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Resource",
        required : true
    },
    date : {
        type : String,
        required : true
    },
    slot : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ["Booked", "Cancelled", "Served"],
        default : "Booked"
    },
},{timestamps : true})

const Booking = mongoose.model("Booking", bookingSchema)

export default Booking