import express from "express";

import { getAllTicket, purchaseTicket } from "./ticket.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";


// ROUTER EXTRACT FROM EXPRESS
const ticketRouter = express.Router();

// TICKET ROUTER 
ticketRouter.get("/", getAllTicket);
ticketRouter.post("/purchase", authenticateUser, purchaseTicket);

export default ticketRouter;