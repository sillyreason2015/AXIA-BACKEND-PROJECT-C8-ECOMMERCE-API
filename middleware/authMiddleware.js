import jwt from 'jsonwebtoken'
import User from '../schema/userSchema.js'


// Middleware to authenticate normal users
const authMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.token;       // Get JWT token from cookies
    const jwtSecret = process.env.ACCESS_TOKEN;  // JWT secret from environment variables

    // If no token is provided, reject the request
    if (!accessToken) {
        return res.status(401).json({ message: "Please Login First" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(accessToken, jwtSecret);
        const userId = decoded.userId;  // Extract userId from the token payload

        // If token does not contain userId, reject the request
        if (!userId) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        // Verify that the user exists in the database
        const verifiedUser = await User.findById(userId);
        if (!verifiedUser) {
            return res.status(401).json({ message: "Invalid User" });
        }

        // Attach verified user object to request for downstream middleware/routes
        req.user = verifiedUser;

        // Proceed to next middleware or route handler
        next();

    } catch (error) {
        // Handle token verification errors (e.g., expired, malformed)
        res.status(500).json({ message: error.message });
    }
};

export default authMiddleware;
