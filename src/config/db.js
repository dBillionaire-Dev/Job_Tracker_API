import mongoose from"mongoose"
import env from "../config/env.js"

const ConnectToDB = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI);
        console.log("Database Connection Successful");
    } catch (err) {
        console.log("Error:", err.message);
    }
}

export default ConnectToDB;