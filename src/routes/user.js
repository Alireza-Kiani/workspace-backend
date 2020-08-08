import express from "express";
import userAuth from "../middleware/userAuth.js";
import User from "../controllers/user.js"




//
const userRouter = new express.Router();

//sign up
//body: {
//  "userName": "",
//     "email": "",
//     "password": ""
//}
userRouter.post("/user/register", User.register);

//log in
// body: {
//     "email": "",
//     "password": ""
// }
userRouter.post("/user/login", User.logIn)

//validating users current token
userRouter.get("/user/is-logged-in", userAuth, User.checkToken);

//log out
userRouter.delete("/user/logout", userAuth, User.logOut);

//profile
userRouter.get("/user/me", userAuth, User.profile);

//forgot password
// {
//     "email": ""
// }
userRouter.post("/user/forgot-password", User.forgotPassword);



export default userRouter;
