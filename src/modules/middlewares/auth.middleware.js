import createError from "http-errors";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/constants.js";


// AUTHENTICATE USER MIDDLEWARE
export const authenticateUser = (req, res, next) => {
    try {
        // Extract token from request cookies
        const token = req.cookies.authToken;
        if (!token) {
            throw createError(401, "Authentication token is missing. Please login first.")
        };

        // Verify token using jwt secret
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            throw createError(401, "Invalid or expired token.")
        };

        // Set user info to the request user
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };

        next();
    } catch (error) {
        next(createError(401, error.message || "Unauthorized access"))
    }
};