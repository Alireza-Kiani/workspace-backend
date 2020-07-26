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
        socket.emit("pushNotifications",await getNotifications("5f1bfd7a013be81930ab9a67"));
    })

    //adding a notification emit
    //input: content, userId
    socket.on("addNotification", (content, userId) => {
        addNotification(content, userId);
    })

})