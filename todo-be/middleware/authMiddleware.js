import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({message: "Không có token, xác thực thất bại"});
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode.id;
        next();
    } catch (err) {
        res.status(401).json({message: "Token không hợp lệ"});
    }
};