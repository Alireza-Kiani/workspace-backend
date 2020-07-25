import express from "express";
import User from "../models/user.js";
import userAuth from "../middleware/userauth.js";


//
const userRouter = new express.Router();

//sign up
//body: {
//  "userName": "",
//     "email": "",
//     "password": ""
//}
userRouter.post("/user/register", async (req, res) => {
    const user = new User(req.body);
    try {
        const token = await user.generateAuthToken();
        res.cookie('Authorization', 'Bearer ' + token, {
            expires: new Date(Date.now() + 5 * 24 * 3600000)
        }).status(201).send({user, token});
    } catch(e) {
        res.status(400).send(e);
    }
})

//log in
// body: {
//     "userName": "",
//     "password": ""
// }
userRouter.post("/user/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.userName, req.body.password);
        const token = await user.generateAuthToken();
        res.cookie('Authorization', 'Bearer ' + token, {
            expires: new Date(Date.now() + 5 * 24 * 3600000)
        }).status(200).send({user, token});
    } catch(e) {
        console.log(e);
        res.status(400).send(e);
    }
})

//validating users current token
userRouter.get("/user/isloggedin", userAuth, async (req, res) => {
    res.status(200).send({user: req.user, result: true});
});

//log out
userRouter.delete("/user/logout", userAuth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((entry) => {
            return entry.token !== req.token;
        });

        await req.user.save();
        res.status(200).send();
    }catch(e) {
        res.status(400).send(e);
    }
});

//profile
userRouter.get("/user/me", userAuth, async (req, res) => {
    res.status(200).send(req.user);
});








export default userRouter;
