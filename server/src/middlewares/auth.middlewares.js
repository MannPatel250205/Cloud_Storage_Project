import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    const authHeader = req.header("Authorization");
    
    console.log('Auth middleware - Authorization header:', authHeader ? 'Present' : 'Missing');

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log('Auth middleware - Invalid or missing Bearer token');
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    console.log('Auth middleware - Token extracted:', token ? 'Present' : 'Missing');

    try {
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables");
            return res.status(500).json({ message: "Server configuration error." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Auth middleware - Token verified, user ID:', decoded.userId);
        req.user = decoded; // You can access this in your controllers via req.user.userId
        next();
    }
    catch (err) {
        console.error("JWT verification error:", err.message);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired." });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token." });
        }
        return res.status(400).json({ message: "Invalid or expired token." });
    }
};

export default authenticate;
