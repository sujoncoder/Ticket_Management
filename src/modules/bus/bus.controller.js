import createError from "http-errors";

import Bus from "./bus.model.js";
import { successResponse } from "../utils/response.js";


// GET ALL BUS
export const getAllBus = async (req, res, next) => {
    try {
        const buses = (await Bus.find({}));

        if (!buses) {
            throw createError(404, "Buses not found.")
        };

        return successResponse(res, {
            statusCode: 200,
            message: "Get all bus Successfully",
            payload: buses
        });
    } catch (error) {
        next(createError(500, error.message))
    }
};