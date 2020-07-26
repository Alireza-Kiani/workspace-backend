import express from "express";
import Chat from "../models/chat.js";
import userAuth from "../middleware/userAuth.js";
import cryptoRandomString from "crypto-random-string";
import User from "../models/user.js";
import {getChats} from "../services/chat.js";
import {ErrorEnum, TypeEnum} from "../misc/enum.js";


//
const chatRouter = new express.Router();


//create group
// {
//     "boardId": ""
// }
chatRouter.post("/chat/create-group", userAuth, async (req, res) => {
    const chat = new Chat({chatId: req.body.boardId, users: [req.user._id], type: TypeEnum.Group});
    let user = await User.findById(req.user._id);
    console.log(user)
    console.log(user.chats)
    user.chats.push(chat._id);
    try{
        await chat.save();
        await user.save();
        res.status(201).send({chat});
    } catch (e) {
        res.status(400).send(e);
    }
});

//create direct
// {
//     "_id": ""
// }
chatRouter.post("/chat/create-direct", userAuth, async (req, res) => {
    if (req.user._id == req.body._id) {
        return res.status(400).send({e: "two users are same account"});
    }

    const chat = new Chat({chatId: cryptoRandomString({length: 12}), users: [req.user._id, req.body._id], type: TypeEnum.Direct});
    let user = await User.findById(req.body._id);
    user.chats.push(chat._id);
    req.user.chats.push(chat._id);
    try {
        await chat.save();
        user.save();
        req.user.save();
        res.status(201).send({chat});
    } catch (e) {
        res.status(400).send(e);
    }
});

//get chats
chatRouter.get("/chat/all", userAuth, async (req, res) => {
    res.status(201).send(await getChats(req.user._id));
});


export default chatRouter;

