import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async(req, res) => {
    try {
        let {username, email, password} = req.body;
        email = email.toLowerCase();
        const existingUsername = await User.findOne({username});
        const existingEmail = await User.findOne({email});
        if (existingUsername) {
            return res.status(409).json({message: "Username already exists"})
        }

        if (existingEmail) {
            return res.status(409).json({message: "Email already exists"})
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({username, email, password: hashed});
        await user.save();
        res.json({message: "User registered"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/login", async(req, res) => {
    try {
        let {email, password} = req.body;
        email = email.toLowerCase();
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
        res.json({token});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

export default router;