import express from "express";
import http from "http";
import path from "path";
import cookieParser from "cookie-parser";

//
import "./db/mongoose.js"
import userRouter from "./routes/user.js";

//
const __dirname = path.resolve();

//
const app = express();
export const server = http.createServer(app);
const port = process.env.port || 8080;
const publicDirectoryPath = path.join(__dirname, "/public");


//
app.use(express.json());
app.use(cookieParser());
app.use(userRouter);
app.use(express.static(publicDirectoryPath));
//
server.listen(port, async () => {
    console.log("Server is up and running on port: " + port);
    await import("./services/socket.js");
});