import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    const token = req.cookies.authToken; // ✅ Corrected token extraction
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized: No Token Provided' });
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = userId;
        next();
    } catch (error) {
        console.error("Auth Verification Error:", error);
        return res.status(403).json({ success: false, message: 'Unauthorized: Invalid Token' });
    }
};
