import mongoose from "mongoose";
import Schema from "mongoose";


import User from "./user.js";

//
const notificationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
    }
},{
    timestamps: true
})

//
//creating notification model
const Notification = mongoose.model("Notification", notificationSchema);


//
export default Notification;