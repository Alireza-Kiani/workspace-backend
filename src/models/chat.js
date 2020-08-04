import mongoose from "mongoose";
import Schema from "mongoose";


const chatSchema = new mongoose.Schema ({
    chatId: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    users: [{
        type: Schema.ObjectId,
        required: true
    }],
    type: {
        type: String,
        required: true
    }
})


const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
