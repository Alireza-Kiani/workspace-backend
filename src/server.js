import express from "express";
import http from "http";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

//
import "./db/mongoose.js"
import userRouter from "./routes/user.js";
import chatRouter from "./routes/chat.js";
//
const __dirname = path.resolve();

//
const app = express();
export const server = http.createServer(app);
const port =process.env.port || 8080;
const publicDirectoryPath = path.join(__dirname, "/public");

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

app.use(cors({
    origin: /[localhost\:3000]/,
    credentials: true,
    preflightContinue: true
}));

//
app.use(express.json());
app.use(cookieParser());
app.use(userRouter);
app.use(chatRouter);
app.use(express.static(publicDirectoryPath));
//
server.listen(port, async () => {
    console.log("Server is up and running on port: " + port);
    await import("./services/socket.js");
});