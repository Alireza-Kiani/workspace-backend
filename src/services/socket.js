import socketio from "socket.io";
import {server} from "../server.js";
import {addNotification, getNotifications} from "./notification.js";

const io = socketio(server);



io.on("connection", async (socket) => {

    //connection emit
    //input: userId
    //emit when socket connected
    //returns a users all notifications
    socket.on("connected", async (userId) => {
        socket.emit("pushNotifications",await getNotifications(userId));
    })

    //adding a notification emit
    //input: content, userId
    socket.on("addNotification", (content, userId) => {
        addNotification(content, userId);
    })

    //sending message
    //input: from: userId, to: chatId, message
    socket.on("sendMessage", (from, to, content) => {

    })
})