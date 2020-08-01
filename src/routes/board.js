import express from "express";
import Board from "../models/boards.js";
import userAuth from "../middleware/userAuth.js";
import {ErrorEnum, TypeEnum} from "../misc/enum.js";
import User from "../models/user.js";
import Chat from "../models/chat.js";


//
const boardRouter = new express.Router();


//create a new board
// {
//     "name": "test"
// }
boardRouter.post("/board/create", userAuth, async (req, res) => {
    const board = new Board(req.body);
    board.users.push(req.user._id);
    try {
        board.save();
        const chat = new Chat({chatId: board._id, users: [req.user._id], type: TypeEnum.Group});
        chat.save();
        req.user.chats.push(chat._id);
        req.user.save();
        res.status(201).send(board);
    } catch (e) {
        res.send(500).send(ErrorEnum.DBSync);
    }
});

//delete a board
// {
//     "_id": ""
// }
boardRouter.delete("/board", userAuth, async (req, res) => {
    try {
        const board = await Board.findById(req.body._id);
        const chat = await Chat.findOne({chatId: req.body._id});

        for (const userId of board.users) {
            const user = await User.findById(userId);
            const index = user.chats.indexOf(chat._id);
            user.chats.splice(index, 1);
            user.save();
        }
        chat.remove();
        board.remove();
        res.status(200).send();
    }catch (e) {
        res.status(400).send(e);
    }
})

//adding a member to a board
// {
//     "boardId": "",
//     "userId": ""
// }
boardRouter.post("/board/add-member", userAuth, async (req, res) => {
    let board = null;
    let user = null;
    let chat = null;

    try {
       board = await Board.findById(req.body.boardId);
       if (!board) {
           return res.status(400).send(ErrorEnum.BoardNotFound);
       }
    } catch (e) {
        return res.status(500).send(ErrorEnum.DBSync);
    }
    //checking if user have access to the board
    if (!board.users.includes(req.user._id)) {
        return res.status(403).send();
    }

    try {
        user = await User.findById(req.body.userId);
    } catch (e) {
        return res.status(500).send(ErrorEnum.DBSync);
    }

    //checking if user exists
    if (!user) {
        return res.status(400).send(ErrorEnum.UserNotFound);
    }

    try {
        chat = await Chat.findOne({chatId: board._id});
    } catch (e) {
        return res.status(500).send(ErrorEnum.DBSync);
    }

    board.users.push(user._id);
    user.chats.push(chat._id);
    chat.users.push(user._id);

    try {
        board.save();
        user.save();
        chat.save();
    } catch (e) {
        return res.status(500).send(ErrorEnum.DBSync);
    }
    res.status(200).send();

});


//
export default boardRouter;
