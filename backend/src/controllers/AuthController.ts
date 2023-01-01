import { Request, Response } from "express";
import User, { IUser, TUser } from "../models/user";
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";


const errorFormat = (error: { msg: string; param: string; }) => {
    return {
        message: error.msg,
        param: error.param
    };
}

class UserController {

    static register = async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({
                        errors: errors.formatWith(errorFormat).array()
                    });

            }
            const { firstname, lastname, email, password } = req.body;
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({
                    errors: [
                        {
                            message: "this email is already used by another user",
                        },
                    ],
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);

            const newUser: TUser = {
                firstname,
                lastname,
                email,
                password: hashed,
            };

            user = new User(newUser);
            user.save()

            res.status(201).send("User created");



        } catch (error) {

            return res.status(500).send('Server Error')


        }
    };

    static login = async (req: Request, res: Response) => {


        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({
                        errors: errors.formatWith(errorFormat).array()
                    });

            }
            const { firstname, lastname, email, password } = req.body;
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(403).json({
                    errors: [
                        {
                            message: "Invalid Credentials",
                        },
                    ],
                });
            }

            const checkPassword = await bcrypt.compare(password, user.password);

            if (!checkPassword) {
                return res.status(403).json({
                    errors: [
                        {
                            message: "Invalid Credentials",
                        },
                    ],
                });
            }

            res.status(201).json(
                generateTokens({ userId: user._id })
            )



        } catch (error) {

            return res.status(500).send('Server Error')

        }

    };
    static refreshToken = async (req: Request, res: Response) => {


        //Get the ID from the url
        try {

            const user = await User.findById(req.body.userId).select("_id");

            if (!user) {
                return res.status(401).json({ message: " Unauthorized" });
            }

            res.status(201).json(
                generateTokens({ userId: req.body.userId })
            )

        } catch (err) {
            console.error(JSON.stringify(err));
            res.status(500).send("Server Error");
        }
    };


    static me = async (req: Request, res: Response) => {
        //Get the ID from the url
        try {
            const user = await User.findById(req.body.userId).select("-password -_id");
            res.json(user);
        } catch (err) {
            console.error(JSON.stringify(err));
            res.status(500).send("Server Error");
        }
    };



}

const generateTokens = (jwtPayload: { userId: string }): { accessToken: string, refreshToken: string } => {

    const accessToken = jwt.sign(
        jwtPayload,
        process.env.ACCESS_TOKEN_SECRET_KEY || 'accessTokenSecretKey',
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || 3600 }
    );
    const refreshToken = jwt.sign(
        jwtPayload,
        process.env.REFRESH_TOKEN_SECRET_KEY || 'accessTokenSecretKey',
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '2d' });

    return { accessToken, refreshToken }



}

export default UserController;