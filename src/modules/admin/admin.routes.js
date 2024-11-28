import express from "express";

import { addBus, createTicket, deleteBus, deleteTicket, updateBus, updateTicket } from "./admin.controller.js";

const adminRouter = express.Router();

// BUS ROUTE HERE
adminRouter.post("/bus", addBus);
adminRouter.put("/bus/:id", updateBus);
adminRouter.delete("/bus/:id", deleteBus);


// TICKET ROUTE HERE
adminRouter.post("/ticket", createTicket);
adminRouter.put("/ticket/:id", updateTicket);
adminRouter.delete("/ticket/:id", deleteTicket);


export default adminRouter;