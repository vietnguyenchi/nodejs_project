import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();

const { SECRETE_CODE } = process.env;

export const checkPermission = async (req, res, next) => {
    try {
        // Bước 1: Kiểm tra người dùng dã đăng nhập hay chưa
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(403).json({ message: "You are not logged in" });

        // Bước 2: Kiểm tra token?
        const decoded = jwt.verify(token, SECRETE_CODE);
        const user = await User.findById(decoded._id);
        if (!user) return res.status(403).json({ message: "Error token" });

        // Bước 3: Kiểm tra quyền của người dùng
        if (user.role !== 'Admin') return res.status(400).json({ message: "You do not have permission" });

        // Bước 4: next
        next();

    } catch (error) {
        return res.json({ error: error.name, message: error.message });
    }
}