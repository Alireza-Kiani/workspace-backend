import socketio from "socket.io";
import {server} from "../server.js";
import {addNotification, getNotifications} from "./notification.js";

const io = socketio(server);



io.on("connection", async (socket) => {
    socket.on("connected", async (userId) => {
        socket.emit("pushNotifications",await getNotifications("5f1bfd7a013be81930ab9a67"));
    })

    socket.on("addNotification", (content, userId) => {
        addNotification(content, userId);
    })

})