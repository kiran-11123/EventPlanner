import express from 'express'
import mongoose from 'mongoose'
import Event_data from '../Mongodb/Events_data.js';
const UploadRouter = express.Router();
import multer from 'multer';


const storage = multer.diskStorage({

    destination:function(req,file,cb){
        cb(null,"uploads");
    },

    filename:function(req,file,cb){
        const uniqueSuffix = Date.now();
        cb(null,file.fieldname+'-'+uniqueSuffix+path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});


UploadRouter.post("/upload",upload.single('file'), async(req,res)=>{

    try{

        const {EventName,
          EventDate,
          Duration,
          Venue,
          OrganizedBy,
          StartTime,
          EndTime,
          EventType,
          TotalTickets,
          Price} =     req.body;

          Price = parseInt(Price);
          TotalTickets = parseInt(TotalTickets);


        const file=req.file;

        if(!file){
            return res.json({message:"Image is Required"});
        }

        const newEntry =  new Event_data({
            EventName:EventName,
            EventImage:file.filename,
            EventDate:EventDate,
            Duration:Duration,
            Venue:Venue,
            OrganizedBy:OrganizedBy,
            StartTime:StartTime,
            EndTime:EndTime,
            EventType:EventType,
            TotalTickets:TotalTickets,
            Price:Price,
           
        })
        await newEntry.save();

        return res.status(200).json({
            message:"Event Added Successfully"
        })

    }
    catch(er){
         
        return res.status(500).json({
            message:"Server Error",
            error:er
            
        })
    }
})

















export default UploadRouter;