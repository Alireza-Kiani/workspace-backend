import express from "express";
import userAuth from "../middleware/userAuth.js";
import Chat from "../controllers/chat.js"


//
const chatRouter = new express.Router();


//create group
// {
//     "boardId": ""
// }
// chatRouter.post("/chat/create-group", userAuth, Chat.createGroup);

//create direct
// {
//     "_id": ""
// }
chatRouter.post("/chat/create-direct", userAuth, Chat.createDirect);

//get chats
chatRouter.get("/chat/all", userAuth, Chat.getChats);

//get messages
chatRouter.get("/chat/messages/:chatId", userAuth, Chat.getMessages)


export default chatRouter;

