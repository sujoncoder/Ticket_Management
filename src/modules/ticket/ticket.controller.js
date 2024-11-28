import createError from "http-errors";

import { successResponse } from "../utils/response.js";
import Ticket from "./ticket.model.js";
import Bus from "../bus/bus.model.js";


// GET ALL BUS
export const getAllTicket = async (req, res, next) => {
    try {
        const tickets = await Ticket.find({}).populate("busId", "name route capacity");

        if (!tickets || tickets.length === 0) {
            throw createError(404, "tickets are not available.")
        };

        return successResponse(res, {
            statusCode: 200,
            message: "Get all tickets Successfully",
            payload: tickets
        });
    } catch (error) {
        next(createError(500, error.message))
    };
};


// TICKET PURCHASE
export const purchaseTicket = async (req, res, next) => {
    try {
        const { busId, timeSlot } = req.body;

        if (!busId || !timeSlot) {
            throw createError(400, "Bus id and Time slot are required.")
        };

        // Extract user info from req cookies
        const userId = req.user?.id;
        if (!userId) {
            throw createError(401, "User not authenticate.")
        };


        const bus = await Bus.findById(busId);
        if (!bus) {
            throw createError(404, "Bus not found.")
        };

        if (bus.capacity <= 0) {
            throw createError(400, "No seat available for this bus.")
        };

        bus.capacity -= 1;
        await bus.save();

        const price = 200
        const ticket = await Ticket.create({
            userId,
            busId,
            timeSlot,
            price,
        });

        return successResponse(res, {
            statusCode: 200,
            message: "Ticket purchase Successfully",
            payload: ticket
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};