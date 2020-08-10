import express from "express";
import userAuth from "../middleware/userAuth.js";
import Board from "../controllers/board.js";


//
const boardRouter = new express.Router();


//create a new board
// {
//     "name": "test"
// }
boardRouter.post("/board/create", userAuth, Board.newBoard);

//delete a board
// {
//     "_id": ""
// }
boardRouter.delete("/board", userAuth, Board.deleteBoard);

//adding a member to a board
// {
//     "boardId": "",
//     "email": ""
// }
boardRouter.post("/board/add-member", userAuth, Board.addMember);

//getting a users all boards
boardRouter.get("/board/all", userAuth, Board.getBoards);


//
export default boardRouter;
