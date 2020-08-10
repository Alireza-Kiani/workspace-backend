import Board from "../models/boards.js";
import {ErrorEnum, TypeEnum} from "../misc/enum.js";
import Chat from "./chat.js";
import User from "./user.js";

class BoardClass {

    findById = async (_id) => {
        return Board.findById(_id)
    }

    //api

    newBoard = async (req, res) => {
        const board = new Board(req.body);
        board.users.push(req.user._id);
        try {
            board.save();
            const chat = await Chat.createModel(board._id, req.user._id, TypeEnum.Group);
            chat.save();
            req.user.chats.push(chat._id);
            req.user.save();
            res.status(201).send(board);
        } catch (e) {
            res.status(500).send(ErrorEnum.DBSync);
        }
    }

    deleteBoard = async (req, res) => {
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
        } catch (e) {
            res.status(400).send(e);
        }
    }

    addMember = async (req, res) => {
        let board = null;
        let user = null;
        let chat = null;
        let users = [];

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
            user = await User.findOne({email: req.body.email});
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
            console.log(e)
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

        for (const user of board.users) {
            users.push( await User.findById(user));
        }

        res.status(200).send({board, users});
    }

    getBoards = async (req, res) => {
        let boards = [];
        for (const chatId of req.user.chats) {
            const chat = await Chat.findById(chatId);
            if (chat){
                if (chat.type === TypeEnum.Group) {
                    const board = await new BoardClass().findById(chat.chatId)
                    if (board) {
                        boards.push(board);
                    }
                }
            }
        }
        res.status(200).send(boards)

    }
}

export default new BoardClass();
