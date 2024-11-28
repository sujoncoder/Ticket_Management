import createError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../user/user.model.js";
import { successResponse } from "../utils/response.js";
import { JWT_SECRET } from "../config/constants.js";


// REGISTER CONTROLLER
export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            throw createError(409, "All fields are required.");
        };

        const existUser = await User.findOne({ email });

        if (existUser) {
            throw createError(409, "User with this email already exists. Please login.");
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Send success response
        return successResponse(res, {
            statusCode: 201,
            message: "User register successfully.",
            payload: newUser
        });

    } catch (error) {
        next(createError(500, error.message))
    }
};

// LOGIN CONTROLLER
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw createError(409, "All fields are required.");
        };

        const user = await User.findOne({ email });

        if (!user) {
            throw createError(400, "User not found. Please register first.");
        };

        const isValidPassword = await bcrypt.compare(password, user.password);


        if (!isValidPassword) {
            throw createError(400, "Invalid email or password.");
        };

        // generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        // set cookie
        res.cookie("authToken", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // for 7 days
            httpOnly: true,
            // secure: true,
            sameSite: "none"
        });

        // Send success response
        return successResponse(res, {
            statusCode: 200,
            message: "User login successfully.",
            payload: token
        });

    } catch (error) {
        next(createError(500, error.message))
    }
};

// LOGOUT CONTROLLER
export const logout = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;

        if (!token) {
            throw createError(401, "Already logout. Please log in");
        };

        res.clearCookie("authToken")
        return successResponse(res, {
            statusCode: 200,
            message: "User logout Successfully",
        });
    } catch (error) {
        next(error)
    }
};
