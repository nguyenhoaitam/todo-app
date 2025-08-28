import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async(req, res) => {
    try {
        const {username, email, password} = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({username, email, password: hashed});
        await user.save();
        res.json({message: "User registered"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

export default router;