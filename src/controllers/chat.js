import Chat from "../models/chat.js";

class ChatClass {

    createModel = async (boardId, userId, type) => {
        return new Chat({chatId: boardId, users: [userId], type})
    }

    findOne = async (chat) => {
        return Chat.findOne(chat);
    }

}

export default new ChatClass();