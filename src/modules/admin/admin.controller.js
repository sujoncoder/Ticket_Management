import createError from "http-errors";

import Bus from "../bus/bus.model.js"
import { successResponse } from "../utils/response.js"
import Ticket from "../ticket/ticket.model.js";


// ADMIN CREATE A NEW BUS
export const addBus = async (req, res, next) => {
    try {
        const { name, route, capacity } = req.body;

        if (!name || !route || !capacity) {
            throw createError(400, "All fields are required.");
        };

        const busExists = await Bus.findOne({ name });
        if (busExists) {
            throw createError(400, "Bus with this name already exists.");
        };

        const newBus = await Bus.create({ name, route, capacity });

        return successResponse(res, {
            statusCode: 201,
            message: "Bus added successfully.",
            payload: newBus,
        });

    } catch (error) {
        next(createError(500, error.message))
    }
};

// ADMIN UPDATE A BUS USING BUS ID
export const updateBus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, route, capacity } = req.body;

        if (!name || !route || !capacity) {
            throw createError(400, "All fields are required.");
        };

        const updateBus = await Bus.findByIdAndUpdate(id, { name, route, capacity }, { new: true })


        if (!updateBus) {
            throw createError(404, "Bus not found.");
        };

        return successResponse(res, {
            statusCode: 202,
            message: "Bus info update successfully.",
            payload: updateBus,
        });

    } catch (error) {
        next(createError(500, error.message))
    }
};

// ADMIN DELETE A BUS USING BUS ID
export const deleteBus = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleteBus = await Bus.findByIdAndDelete(id, { new: true });
        if (!deleteBus) {
            throw createError(404, "Bus not found.");
        };

        return successResponse(res, {
            statusCode: 202,
            message: "Bus delete successfully.",
            payload: deleteBus,
        });

    } catch (error) {
        next(createError(500, error.message))
    }
};


// ----------------- HERE IS TICKET ------------

// ADMIN CREATE A NEW BUS
export const createTicket = async (req, res, next) => {
    try {
        const { busId, price, timeSlot } = req.body;

        if (!busId || !price || !timeSlot) {
            throw createError(400, "All fields are required.");
        };

        const ticketExists = await Ticket.findOne({ busId, timeSlot });

        if (ticketExists) {
            throw createError(400, "Ticket already exists for this bus and time slot.");
        };

        const newTicket = await Ticket.create({ busId, price, timeSlot });

        return successResponse(res, {
            statusCode: 201,
            message: "Ticket create successfully.",
            payload: newTicket,
        });

    } catch (error) {
        next(createError(500, error.message))
    }
};

// ADMIN UPDATE A BUS USING BUS ID
export const updateTicket = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { busId, price, timeSlot } = req.body;

        if (!busId || !price || !timeSlot) {
            throw createError(400, "All fields are required.");
        };

        const updateTicket = await Ticket.findByIdAndUpdate(id, { busId, price, timeSlot }, { new: true })


        if (!updateTicket) {
            throw createError(404, "Ticket not found.");
        };

        return successResponse(res, {
            statusCode: 202,
            message: "Ticket info update successfully.",
            payload: updateTicket,
        });

    } catch (error) {
        next(createError(500, error.message))
    }
};

// ADMIN DELETE A BUS USING BUS ID
export const deleteTicket = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleteTicket = await Ticket.findByIdAndDelete(id, { new: true });

        if (!deleteTicket) {
            throw createError(404, "Ticket not found.");
        };

        return successResponse(res, {
            statusCode: 202,
            message: "Ticket delete successfully.",
            payload: deleteTicket,
        });

    } catch (error) {
        next(createError(500, error.message))
    }
};