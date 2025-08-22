import jwt from 'jsonwebtoken'
import Admin from '../schema/adminSchema.js'


// Middleware to authenticate admin users
const adminAuth = async (req, res, next) => {
    const accessToken = req.cookies.token      // Get token from cookies
    const jwtSecret = process.env.ACCESS_TOKEN // Get JWT secret from environment variables

    // If no token provided, return 401 Unauthorized
    if (!accessToken) {
        return res.status(401).json({ message: "Please Login First" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(accessToken, jwtSecret);
        const adminId = decoded.adminId;  // Extract adminId from decoded token

        // If token does not contain adminId, reject request
        if (!adminId) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        // Verify that the admin exists in the database
        const verifiedAdmin = await Admin.findById(adminId);
        if (!verifiedAdmin) {
            return res.status(401).json({ message: "Invalid Id" });
        }

        // Attach verified admin object to request for routes
        req.admin = verifiedAdmin;

        // Proceed to next middleware or route handler
        next();

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default adminAuth;
