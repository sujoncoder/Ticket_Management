import app from "./app.js";
import { PORT } from "./modules/config/constants.js";
import connectDB from "./modules/config/db.js";


// APPLICATION LISTENING
app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`)
    await connectDB()
});