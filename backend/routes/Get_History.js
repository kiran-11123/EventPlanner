import express from 'express'
import mongoose from 'mongoose'
import Authentication_token from '../middlewares/Authentication.js';
import Event_data from '../Mongodb/Events_data.js';
import Users_history from '../Mongodb/User_History.js';
const History_router = express.Router();


History_router.get("/getAll_history" ,Authentication_token ,async(req,res)=>{

  

    try{

        const userId = req.user.userId;

        const get_users_data = await Users_history.find({userId:userId});
     

        if(!get_users_data){
            return res.status(400).json({
                message:"The User dont have any history"
            })
        }
        
        return res.status(200).json({
            message:"Data Fetched Successfully",
            history:get_users_data[0].history
        })

    }
    catch(er){
          
        return res.status(500).json({
            message:"Internal Server Error",
            error:er
        })
    }

})











export default History_router;
