import Chat from "../models/chat.js";
import {TypeEnum} from "../misc/enum.js";
import User from "../models/user.js";
import cryptoRandomString from "crypto-random-string";
import {getChats, getMessages} from "../services/chat.js";

class ChatClass {

    createModel = async (boardId, userId, type) => {
        return new Chat({chatId: boardId, users: [userId], type})
    }

    findById = async (_id) => {
        return Chat.findById(_id);
    }

    findOne = async (chat) => {
        return Chat.findOne(chat);
    }

    createGroup = async (req, res) => {
        const chat = new Chat({chatId: req.body.boardId, users: [req.user._id], type: TypeEnum.Group});
        let user = await User.findById(req.user._id);
        user.chats.push(chat._id);
        try{
            await chat.save();
            await user.save();
            res.status(201).send({chat});
        } catch (e) {
            res.status(400).send(e);
        }
    }

    createDirect = async (req, res) => {
        if (req.user._id === req.body._id) {
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
            res.status(201).send({chatId: chat.chatId, user: user});
        } catch (e) {
            res.status(400).send(e);
        }
    }

    getChats = async (req, res) => {
        res.status(200).send(await getChats(req.user._id));
    }

    getMessages = async (req, res) => {
        res.status(200).send(await getMessages(req.params.chatId));
    }
}

export default new ChatClass();