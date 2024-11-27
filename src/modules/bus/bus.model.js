import mongoose from "mongoose";


const busSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Bus name is required."],
    },
    route: {
        type: String,
        required: [true, "Route name is required."],
    },
    capacity: {
        type: Number,
        required: [true, "Capacity number is required."],
    }
}, { timestamps: true });

const Bus = mongoose.model("Bus", busSchema);

export default Bus;