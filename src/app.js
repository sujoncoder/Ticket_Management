import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser"
import createHttpError from "http-errors";
import rateLimit from "express-rate-limit";

import { errorResponse } from "./modules/utils/response.js";
import authRouter from "./modules/auth/auth.routes.js";
import adminRouter from "./modules/admin/admin.routes.js";
import busRouter from "./modules/bus/bus.routes.js";
import ticketRouter from "./modules/ticket/ticket.routes.js";


// RATE LIMITER
const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20,
    message: "Too many requests from this IP. Please try again later."
});


// EXTRACT APP FROM THE EXPRESS
const app = express();

// APPLICATION LAYER MIDDLEWARE
app.use(cookieParser());
app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


// APPLICATION LAYER MIDDLEWARE ==> ROUTING
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/buses", busRouter);
app.use("/tickets", ticketRouter);


// HANDLE CLIENT ERROR
app.use((req, res, next) => {
    next(createHttpError(500, "Route not found"))
});


// HANDLE SERVER ERROR
app.use((err, req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message
    })
});

export default app;