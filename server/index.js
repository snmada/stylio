import "dotenv/config";
import express from "express";
import cors from "cors";
import apiRoutes from "./routes/index.js";

const CLIENT_URL = process.env.CLIENT_URL;
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors({
    origin: CLIENT_URL, 
    credentials: true,
}));

app.use(express.json());

app.use("/api", apiRoutes);

app.listen(PORT, (error) => {
    if(error) {
        throw error;
    } 
    else {
        console.log("\x1b[32m%s\x1b[0m", `Server is running on PORT: ${PORT}`);
    }
});