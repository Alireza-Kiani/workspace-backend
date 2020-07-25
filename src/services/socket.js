import socketio from "socket.io";
import {server} from "../server.js";
import {addNotification} from "./notification.js";

const io = socketio(server);


io.on("connection", async (socket) => {
    socket.on("addNotification", async (content, userId) => {
       await addNotification(content, userId)
    })

})