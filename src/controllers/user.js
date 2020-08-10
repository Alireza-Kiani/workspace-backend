import User from "../models/user.js";
import validator from "validator";
import {ErrorEnum} from "../misc/enum.js";
import {sendEmail} from "../services/email.js";
import Cryptr from "cryptr";

const cryptr = new Cryptr('myTotallySecretKey');

class UserClass {

    createModel = async (user) => {
        return new User(user);
    }

    findById = async (userId) => {
        return await User.findById(userId);
    }

    findOne = async (user) => {
        return await User.findOne(user);
    }

    //api

    register =  async (req, res) => {
        const user = new User(req.body);
        try {
            const token = await user.generateAuthToken();
            res.cookie('Authorization', 'Bearer ' + token, {
                expires: new Date(Date.now() + 5 * 24 * 3600000)
            }).status(201).send({user, token});
        } catch(e) {
            res.status(400).send(e);
        }
    }

    logIn = async (req, res) => {
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
    }

    checkToken = async (req, res) => {
        res.status(200).send({user: req.user, result: true});
    }

    logOut = async (req, res) => {
        try{
            req.user.tokens = req.user.tokens.filter((entry) => {
                return entry.token !== req.token;
            });

            await req.user.save();
            res.status(200).send();
        }catch(e) {
         res.status(400).send(e);
    }
}

    profile = async (req, res) => {
        res.status(200).send(req.user);
    }

    forgotPassword = async (req, res) => {
        const email = req.body.email;
        if(!validator.isEmail(email)) {
            return res.status(400).send(ErrorEnum.InvalidEmail);
        }

        let user = {};

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

    }


}

export default new UserClass();
