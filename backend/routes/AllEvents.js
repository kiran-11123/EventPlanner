import express from 'express';
const AllEvents_Router = express.Router();
import Authentication_token from '../middlewares/Authentication.js';
import Event_data from  '../Mongodb/Events_data.js';




AllEvents_Router.get("/allEvents", Authentication_token,async ( req,res)=>{


    try{


     

        const AllData = await Event_data.find();

        if(AllData.length===0){

            return res.status(404).json({
                message:"No Events Present , At this time ",
                TotalData:[]
            })

            
            
        }
      


        return res.status(200).json({
            message:"Events are Listed",
            TotalData:AllData
        })



    }
    catch(er){
          
        return res.status(400).json({
            message:"Internal Server Error , Data Fetching Failed",
            error:er
        })
    }


     
})

AllEvents_Router.get("/type",Authentication_token , async(req,res)=>{

    try{

        const requested_type = req.body;

        const filter={};

        filter.EventType = requested_type;

        const getData = await Event_data.find(filter);
        

        if(getData.length===0){
            return res.json(400).json({
                message:"No Events Present",
                TotalData:[]
            })
        }

        return res.status(200).json({
            message:"Data Fetched Successfully",
            TotalData:getData
        })

    }
    catch(er){

        return res.status(500).json({
            message:"Internal Server Error",
            error:er
        })
    }
       

})
       

AllEvents_Router.get("/filter" ,Authentication_token , async(req,res)=>{
       
    try{

        const {EventType,minPrice,maxPrice} = req.body;

        const filter = {};

        if(EventType){
            filter.EventType=EventType;
        }

        if(minPrice || maxPrice){
             
            filter.price ={};

            if(minPrice) filter.price.$gte = Number(minPrice);
            if(maxPrice) filter.price.$lte = Number(maxPrice);

        }

        const getData = await Event_data.find(filter);

        if(getData.length===0){
            return res.status(400).json({
                message:"No Events Present",
                TotalData:[]
            })
        }

        return res.status(200).json({
            message:"Data Fetched Successfully",
            TotalData : getData
        })

    }
    catch(er){
        return res.status(500).json({
            message:"Internal Server Error",
            error:er
        })
    }
})
    




export default AllEvents_Router;