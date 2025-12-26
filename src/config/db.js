import mongoose from"mongoose"

const ConnectToDB = async () => {
    try {
        const mongourl = await process.env.MONGODB_URI;
        mongoose.connect(mongourl)
        console.log("Database Connection Successful");
    } catch (err) {
        console.log("Error:", err.message);
    }
}

export default ConnectToDB;