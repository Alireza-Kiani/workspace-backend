import socketio from "socket.io";
import {server} from "../server.js";
import {getChats, sendMessage} from "./chat.js";
import List from "../controllers/list.js";
import Card from "../controllers/card.js"


const io = socketio(server);



io.on("connection", async (socket) => {

    //connection emit
    //input: userId
    //emit when socket connected
    //returns a users all notifications
    socket.on("connected", async (userId) => {
        // await pushNotificationToCache(userId);
        // socket.emit("receiveNotifications",await getNotifications(userId));
        const chats = await getChats(userId);
        chats.forEach((item) => {
            socket.join(item.chatId);
        })
    })

    //sending message
    //input: from: userId, to: chatId, message
    socket.on("sendMessage", async ({from, to, content}) => {
        const message = await sendMessage(from, to, content);
        socket.broadcast.to(to).emit("receiveMessage", {from, to, content, date: message.createdAt});
        // socket.broadcast.to(to).emit("newMessageNotification", from, to, content);
    })

    //create new list
    socket.on("createList", async ({name, motherBoard}) => {
        const list = await List.createList(name, motherBoard);
        socket.broadcast.to(motherBoard).emit("newList", {list});
    })

    //remove list
    socket.on("removeList", async ({_id}) => {
        const list = await List.removeList(_id);
        socket.broadcast.to(list.motherBoard).emit("removedList", {list});
    })

    //edit list
    socket.on("editList", async ({_id, name}) => {
        const list = await List.editList(_id, name);
        socket.broadcast.to(list.motherBoard).emit("editedList", {list});
    })

    //create new card
    socket.on("createCard", async ({name, content , motherList}) => {
        const card = await Card.createCard(name, content, motherList);
        const list = await List.findById(card.motherList);
        socket.broadcast.to(list.motherBoard).emit("newCard", {card});
    })

    //remove card
    socket.on("removeCard", async ({_id}) => {
        const card = await Card.removeCard(_id);
        const list = await List.findById(card.motherList);
        socket.broadcast.to(list.motherBoard).emit("removedCard", {card});
    })

    //edit card
    socket.on("editCard", async ({_id, content, name}) => {
        const card = await Card.editCard(_id, content, name);
        const list = await List.findById(card.motherList)
        socket.broadcast.to(list.motherBoard).emit("editedCard", {card});
    })

})