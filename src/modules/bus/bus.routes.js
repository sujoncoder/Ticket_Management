import express from "express";

import { getAllBus } from "./bus.controller.js";

// EXTRACT BUS ROUTER FROM EXPRESS
const busRouter = express.Router();

busRouter.get("/", getAllBus);

export default busRouter;