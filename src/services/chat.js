import Chat from "../models/chat.js";
import User from "../models/user.js";
import Message from "../models/message.js";

import cRS from "crypto-random-string"

//
const createGroupChat = async (boardId, creator) => {
    const chat = new Chat({chatId: boardId, users: [creator]});
    console.log(chat)
}

//
const createDirectChat = async () => {

}

//
const getAllChats = async () => {

}
