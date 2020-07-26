import Chat from "../models/chat.js";
import User from "../models/user.js";
import Message from "../models/message.js";

import cRS from "crypto-random-string";

//
export const sendMessage = async (from, to, content) => {
    const message = new Message(from, to, content);
    message.save();
}

export const getChats = async (userId) => {
    let chats = [];
    const user = await User.findById(userId);
    for (const _id of user.chats) {
        const chat = await Chat.findById(_id);
        chats.push(chat)
    }
    return chats;
}
