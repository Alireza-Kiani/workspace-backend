import socketio from "socket.io";
import {server} from "../server.js";
import {addNotification, getNotifications} from "./notification.js";
import {getChats, sendMessage} from "./chat.js";
import {pushNotificationToCache} from "./notification.js";

const io = socketio(server);



io.on("connection", async (socket) => {
    //connection emit
    //input: userId
    //emit when socket connected
    //returns a users all notifications
    socket.on("connected", async (userId) => {
	console.log(userId);
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
	console.log(content);
        await sendMessage(from, to, content);
        socket.broadcast.to(to).emit("receiveMessage", from, to, content);
        // socket.broadcast.to(to).emit("newMessageNotification", from, to, content);
    })
})