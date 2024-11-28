import createError from "http-errors";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/constants.js";




// IS_LOGGED_IN MIDDLEWARE
export const isLoggedIn = async (req, res, next) => {
    try {
        const authToken = req.cookies.authToken;
        if (!authToken) {
            throw createError(401, "Token not found. Please login")
        };

        const decoded = await jwt.verify(authToken, JWT_SECRET)

        if (!decoded) {
            throw createError(401, "Invalid access token. Please login again")
        }
        req.user = decoded.user
        next()
    } catch (error) {
        return next(error)
    }
};



// IS_ADMIN MIDDLEWARE
export const isAdmin = async (req, res, next) => {
    try {
        if (!req.user.role === "admin") {
            throw createError(403, "Forbidden. You must be an admin to access this resource")
        }
        next();
    } catch (error) {
        return next(error)
    }
};