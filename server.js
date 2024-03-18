import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import bodyParser from "body-parser";
import cors from 'cors';
import categoryRoutes from "./routes/categoryRoutes.js"


const app = express()

//configure env
dotenv.config()

//configure database
connectDB();

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);

app.get("/", (req, res) => {
    res.send("<h1>Hello there</h1>");
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})