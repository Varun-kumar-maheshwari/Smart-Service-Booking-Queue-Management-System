import mongoose, { Schema } from "mongoose";

const resourceSchema = new Schema({
    service : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Service",
        required : true
    },
    name : {
        type : String,
        required : true
    },
    isAvailable : {
        type : Boolean,
        default : true
    }
})

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource