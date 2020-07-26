import mongoose from "mongoose";
import Schema from "mongoose";


//
const messageSchema = new mongoose.Schema({
    from: {
        type: Schema.ObjectId,
        required: true
    },
    to: {
        type: Schema.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

//
//creating message model
const Message = mongoose.model("Message", messageSchema);


//
export default Message;