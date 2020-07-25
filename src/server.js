import express from "express";
import http from "http";
import userRouter from "./routes/user.js";
import "./db/mongoose.js"
import cookieParser from "cookie-parser";


//
const app = express();
const server = http.createServer(app);
const port =process.env.port ||3001;

//
app.use(express.json());
app.use(cookieParser());
app.use(userRouter);

//
server.listen(port, async () => {
    console.log("Server is up and running on port: " + port);
});