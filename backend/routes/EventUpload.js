import express from 'express'
import mongoose from 'mongoose'
import Event_data from '../Mongodb/Events_data.js';
const UploadRouter = express.Router();
import multer from 'multer';
import path from "path"
import fs from "fs";
import Authentication_token from '../middlewares/Authentication.js';
import { fileURLToPath } from "url";
import { error } from 'console';

const uploadDir = path.join(process.cwd(), "uploads");

// ✅ Ensure uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({

    destination:function(req,file,cb){
        cb(null,uploadDir);
    },

    filename:function(req,file,cb){
        const uniqueSuffix = Date.now();
        cb(null,file.fieldname+'-'+uniqueSuffix+path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});
UploadRouter.post("/upload", upload.single("EventImage"), async (req, res) => {
  try {
 

    let {
      EventName,
      EventDate,
      Duration,
      Venue,
      OrganizedBy,
      StartTime,
      EndTime,
      EventType,
      TotalTickets,
      Price,
    } = req.body;

    // Convert numbers
    Price = parseInt(Price);
    TotalTickets = parseInt(TotalTickets);

    

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Image is Required" });
    }

    const newEntry = new Event_data({
      EventName,
      EventImage: file.filename,
      EventDate: EventDate, // now proper Date
      Duration,
      Venue,
      OrganizedBy,
      StartTime,
      EndTime,
      EventType,
      TotalTickets,
      Price,
    });

    await newEntry.save();

    return res.status(200).json({
      message: "Event Added Successfully",
      event: newEntry,
    });
  } catch (er) {
    console.error(er);

    return res.status(500).json({
      message: "Server Error",
      error: er.message,
    });
  }
});


UploadRouter.post("/likes" ,Authentication_token , async(req,res)=>{
        
    try{

      const likes  =req.likes;
      const id = req.id;

      const event_data = await Event_data.findOne({_id:id});

      if(likes===true){
           
         
      }

    }
    catch(er){
         
      return res.status(500).json({
        message:"Internal server Error",
        error:er
      })
    }
})














export default UploadRouter;