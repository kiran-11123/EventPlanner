import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const Auth_router = express.Router();
const My_Secret = process.env.SECRET_KEY;

Auth_router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const usercheck = await prisma.user.findUnique({
            where: { email }
        });

        if (!usercheck || !usercheck.password) {
            return res.status(400).json({
                message: "Email Not Found. Please Register"
            });
        }

        const decrypt_password = await bcrypt.compare(password, usercheck.password);

        if (!decrypt_password) {
            return res.status(400).json({
                message: "Password is Wrong"
            });
        }

        const token_details = {
            username: usercheck.username,
            userId: usercheck.userId,
            email: usercheck.email
        };

        const token = jwt.sign(token_details, My_Secret, {
            expiresIn: "1h"
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 3600000
        });

        return res.json({
            message: "Login successful",
            token: token,
        });

    } catch (er) {
        return res.status(500).json({
            message: "Server Error",
            error: er
        });
    }
});

Auth_router.post("/signup", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const user_email_check = await prisma.user.findUnique({
            where: { email }
        });

        if (user_email_check) {
            return res.status(400).json({
                message: "Email Already Registered, Please Login!"
            });
        }

        const username_check = await prisma.user.findUnique({
            where: { username }
        });

        if (username_check) {
            return res.status(400).json({
                message: "Username Already Taken, Choose Another"
            });
        }

        const hashed_password = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                username,
                password: hashed_password
            }
        });

        return res.status(201).json({
            message: "User Registered Successfully"
        });

    } catch (er) {
        return res.status(500).json({
            message: "Server Error",
            error: er
        });
    }
});

export default Auth_router;