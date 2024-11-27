import mongoose from "mongoose";
import { DB_URL } from "./constants.js";


// DATABASE CONNETION
const connectDB = async (options = {}) => {
    try {
        const db = await mongoose.connect(DB_URL, options)
        if (db) {
            console.log("Database Connect Successfull. 😎")
        }
    } catch (error) {
        console.log("Database Connection Failed. 🥵")
        process.exit(1)
    }
};

export default connectDB;