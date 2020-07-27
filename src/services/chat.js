import Chat from "../models/chat.js";
import User from "../models/user.js";
import Message from "../models/message.js";

import cRS from "crypto-random-string";
import {addNotification} from "./notification.js";
import {NotificationEnum} from "../misc/enum.js";

//
export const sendMessage = async (from, to, content) => {
    const message = await new Message({from, to, content});
    message.save();
    let chat = await Chat.findOne({chatId: to});
    for (const item of chat.users) {
        await User.findById(item);
        if (item != from) {
            await addNotification(NotificationEnum.NewMessage, item);
        }
    }
}

// (async function() {
//     await sendMessage("5f1dbefaa4eb3e3df026d56f", "5498429a9cfc", "hello");
// })();

export const getChats = async (userId) => {
    let chats = [];
    const user = await User.findById(userId);
    for (const _id of user.chats) {
        const chat = await Chat.findById(_id);
        chats.push(chat)
    }
    return chats;
}

