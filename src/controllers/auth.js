import { signInValidator, signUpValidator } from "../validation/user.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

dotenv.config()

const { SECRETE_CODE } = process.env

export const signUp = async (req, res) => {
    try {
        // Bước 1: Validate dữ liệu người dùng
        const { error } = signUpValidator.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ message: error.details[0].message });

        // Bước 2: Kiểm tra xem email đã tồn tại trong hệ thống hay chưa
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) return res.status(400).json({ message: 'Email already registered' });

        // Bước 3: Mã hóa password
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);

        // Bước 4: Khởi tạo user trong db
        const user = await User.create({ ...req.body, password: hashedPassword })

        // Bước 5: Thông báo cho người dùng đăng ký
        user.password = undefined; // Xóa mật khẩu trước khi gửi đi
        return res.status(200).json({ message: "Registration successful", user: user });
    } catch (error) {
        return res.status(500).json({ name: error.name, message: error.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ message: "Users not found" });
        }
        return res.status(200).json({ message: "Got Users successfully", datas: users });
    } catch (error) {
        return res.status(500).json({ message: "Error while getting users", error: error });
    }
}

export const signIn = async (req, res) => {
    try {
        // Bước 1: Validate data từ phía client
        const { error } = signInValidator.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ message: error.details[0].message });

        // Bước 2: Kiểm tra email đã tồn tại hay chưa
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: 'Email not found!' });

        // Bước 3: Find user theo email
        const isMatch = await bcryptjs.compare(req.body.password, user.password);
        if (!isMatch) return res.status(404).json({ message: 'Password mismatch!' });

        // Bước 4: Tạo JWT
        const accessToken = jwt.sign({ _id: user._id }, SECRETE_CODE, { expiresIn: "1d" });

        user.password = undefined;  // Xóa mật khẩu trước khi gửi đi
        return res.status(200).json({ message: "Login successful!", user, accessToken });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}