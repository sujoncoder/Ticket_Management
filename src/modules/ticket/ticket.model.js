import mongoose from "mongoose";


const ticketSchema = new mongoose.Schema({
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    price: {
        type: Number,
        required: [true, "Tcket price is required."],
    },
    timeSlot: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'booked', 'cancelled'],
        default: "available"
    }
}, { timestamps: true });

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;