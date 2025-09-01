import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import Auth_router from "./routes/Authentication_routes.js"
import ConnectDb from "./Mongodb/db.js"
import User_Router from "./routes/AllEvents.js"
import AllEvents_Router from "./routes/AllEvents.js"
import rateLimit from 'express-rate-limit';
import Ticket_Router from "./routes/Ticket_Booking_Details.js"
import UploadRouter from "./routes/EventUpload.js"


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:"Too Many requsts , Please try again later"
})

await ConnectDb();
dotenv.config()
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(limiter);
app.use("/api/auth", Auth_router);
app.use("/api/user" , User_Router);
app.use("/api/eventsData",AllEvents_Router);
app.use("/api/eventUpload" , UploadRouter);
app.use('/uploads', express.static('uploads'));
app.use('/api/tickets' , Ticket_Router);













app.listen(5000 , ()=>{
    console.log("Server is running on port 5000");
})