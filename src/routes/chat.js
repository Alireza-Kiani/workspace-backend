import express from "express";
import Chat from "../models/chat.js";
import userauth from "../middleware/userauth.js";
// import cryptoRandomString from "crypto-random-string";


//
const chatRouter = new express.Router();


//create group
// {
//     "boardId": ""
// }
chatRouter.post("/chat/create-group", userauth, async (req, res) => {
    const chat = new Chat({chatId: req.body.boardId, users: [req.user._id], type: "GROUP"});
    await chat.save();
    res.status(201).send({chat});
});

//create direct
// {
//     "_id": ""
// }
chatRouter.post("/chat/create-direct", userauth, async (req, res) => {

    const chat = new Chat({chatId: cryptoRandomString({length: 12}), users: [req.user._id, req.body._id], type: "DIRECT"});
    await chat.save();
    res.status(201).send({chat});
});

//get chats
// chatRouter.get("/chat/all", userauth, async (req, res) => {
//    const chats = await Chat.find
// });


export default chatRouter;

