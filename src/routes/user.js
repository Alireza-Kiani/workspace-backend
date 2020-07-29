import express from "express";
import User from "../models/user.js";
import { } from "../misc/enum.js";
import userAuth from "../middleware/userAuth.js";
import validator from "validator";
import {sendEmail} from "../services/email.js";
import {ErrorEnum} from "../misc/enum.js";
import Cryptr from "cryptr";
const cryptr = new Cryptr('myTotallySecretKey');



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
//     "email": "",
//     "password": ""
// }
userRouter.post("/user/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.cookie('Authorization',
            'Bearer ' + token, {
            expires: new Date(Date.now() + 5 * 24 * 3600000)
        }).status(200).send({user, token});
    } catch(e) {
        console.log(e);
        res.status(400).send(e);
    }
})

//validating users current token
userRouter.get("/user/is-logged-in", userAuth, async (req, res) => {
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

//forgot password
// {
//     "email": ""
// }
userRouter.post("/user/forgot-password", async (req, res) => {
    const email = req.body.email;
    if(!validator.isEmail(email)) {
        return res.status(400).send(ErrorEnum.InvalidEmail);
    }

    let user = null;

    try {
        user = await User.findOne({email});
    } catch (e) {
        console.log(e);
        res.status(500).send(ErrorEnum.DBSync);
    }

    if(!user) {
        return res.status(400).send(ErrorEnum.EmailNotFound);
    }

    await sendEmail(email, "Recover Password", await cryptr.decrypt(user.password), function (error, info) {
        if (error) {
            return res.status(500).send({
                error, status: "Failed"
            });
        }
        res.status(200).send({info, status: "Succeed"});
    })

});








export default userRouter;
