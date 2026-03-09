// middleware/auth.js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                error: 'Access denied. No token provided.'
            });
        }

        // Extract token from "Bearer TOKEN" format
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                error: 'Access denied. Invalid token format.'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add user info to request object
        req.user = decoded;

        // Continue to next middleware/route handler
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Token expired. Please login again.'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({
                error: 'Invalid token.'
            });
        }

        console.error('Auth middleware error:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}

module.exports = authMiddleware