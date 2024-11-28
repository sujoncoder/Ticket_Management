import dotenv from "dotenv";
dotenv.config();


export const PORT = process.env.SERVER_PORT || 3001;
export const DB_URL = process.env.DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET || "iamsujonsheikh"