import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
            const { name, email, password, profilePic } = req.body;
    try {
        if (!name || !email || !password || !profilePic) {
            return res.status(401).json({ success: false, messagee: 'All Fields are required' });
        };
        if (!email.includes('@')) {
            return res.status(401).json({ success: false, message: 'Enter valid email address' })
        }
        const user = await User.findOne({email});
        if (user) {
            return res.json({ success: true, message: 'User already exists please kindly login' })
        }
        const hashword = await bcrypt.hash(password, 8);
        const newUser = new User({ name, email, password: hashword ,profilePic});
        await newUser.save();
        return res.status(201).json({ success: true, message: 'Successfully User Registered', newUser });
    } catch (error) {
        return res.json({ success: false, message: 'Internal Server Error' });
    }
};
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        if (!email.includes("@")) {
            return res.status(400).json({ success: false, message: "Enter a valid email address" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const matchUser = await bcrypt.compare(password, user.password);
        if (!matchUser) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // ✅ Set HTTP-Only Secure Cookie
        res.cookie("authToken", token, {
            httpOnly: true, // ✅ Prevents client-side access
            secure: process.env.NODE_ENV === "production", // ✅ Use secure cookies only in production
            sameSite: "Lax", // ✅ Helps with CSRF protection
            maxAge: 3600000, // ✅ Cookie expires in 1 hour (3600000ms)
        });

        return res.status(200).json({ success: true, message: "Successfully logged in",token });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const logoutUser=async(req,res)=>{
    try {
        res.clearCookie('authToken');
        return res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        return res.json({ success: false, message: 'Internal Server Error' });
    }
};
export const profileUser = async (req, res) => {
    try {
        // ✅ Extract token from cookies
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }

        // ✅ Verify JWT token
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: 'User Not Found' });
        }

        return res.status(200).json({ success: true, message: 'Profile fetched successfully', user });
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};