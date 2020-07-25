import mongoose from "mongoose";

//
const notificationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    userId: {
        type: String,
        required: true,
    }
},{
    timestamps: true
})

//
//creating notification model
const Notification = mongoose.model("Notification", notificationSchema);


//
export default Notification;