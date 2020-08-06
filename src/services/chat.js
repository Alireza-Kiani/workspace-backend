import Chat from "../models/chat.js";
import User from "../models/user.js";
import Message from "../models/message.js";

import cRS from "crypto-random-string";
import {addNotification} from "./notification.js";
import {NotificationEnum, ErrorEnum} from "../misc/enum.js";

//
export const sendMessage = async (from, to, content) => {
    const message = new Message({from, to, content});
    await message.save();
    let chat = await Chat.findOne({chatId: to});
//     for (const item of chat.users) {
//         await User.findById(item);
//         if (item != from) {
//             await addNotification(NotificationEnum.NewMessage, item);
//         }
//     }
    return message;
}




export const getChats = async (userId) => {
    let chats = [];
    let response = [];
    const user = await User.findById(userId);

    for (const _id of user.chats) {
        const chat = await Chat.findById(_id);
        chats.push(chat);
    }

    for (const chat of chats) {
        const target = chat.users.filter(item => item.toString() !== user._id.toString());
        const message = await Message.findOne({to: chat.chatId}).sort({'createdAt': -1});
        response.push({user: await User.findById(target), latestMessage: message, chatId: chat.chatId});
    }

    return response;
}

export const getMessages = async (chatId) => {
    try {
        return await Message.find({to: chatId});
    } catch (e) {
        return ErrorEnum.DBSync;
    }
}
