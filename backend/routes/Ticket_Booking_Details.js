import express from 'express';
import Authentication_token from '../middlewares/Authentication.js';
import Event_data from '../Mongodb/Events_data.js';
import Users_history from '../Mongodb/User_History.js';
const Ticket_Router = express.Router();
const  now= new Date()


Ticket_Router.post("/bookTickets" ,Authentication_token ,async(req,res)=>{
      
     try{

        const user_id = req.user.userId;
        const {event_id , event_name , Tickets_Total ,TotalAmount } = req.body;


        const find_Event = await Event_data.findOne({_id:event_id});
        if(!find_Event){
             
            return res.status(400).json({
                 message:"The Event is not present in the Event List ! Please Check Again"
            })
        }

        const check_event_date = find_Event.EventDate;

        if(check_event_date < now){
             
            return res.status(400).json({
                message:"The Event is completed ! Please check again"
            })
        }

        const Tickets_Available = Number(find_Event.TotalTickets); 

        if(Tickets_Available < Tickets_Total){
               
            return res.status(400).json({
                message:"There are no Sufficient Tickets ! Available ",
                error:er
            })
        }



        const ticketPrice = find_Event.Price;
        const baseAmount = ticketPrice * Tickets_Total;
        const gstRate = 0.18; // 18% GST
        const gstAmount = baseAmount * gstRate;
        const totalAmountWithGST = baseAmount + gstAmount;

        find_Event.TotalTickets = Tickets_Available - Tickets_Total;
        await find_Event.save();

        return res.status(200).json({
            message: "Tickets Booked Successfully",
            event: {
                event_id: find_Event._id,
                event_name: find_Event.EventName,
                tickets_booked: Tickets_Total,
                base_amount: baseAmount,
                gst_amount: gstAmount,
                total_amount: totalAmountWithGST
            }
        });

     }
     catch(er){
         
         return res.status(500).json({
            message:"Internal Server Error",
            error:er
         })
     }
})











Ticket_Router.post("/cancelTicket" , Authentication_token , async(req,res)=>{
       
    try{

        const {event_id} = req.body;

        const history_check = await Users_history.findOne({_id:event_id});

        if(!history_check){
            return res.status(400).json({
                message:"You have not booked any tickets to the Event! Please check"
            })
        }


        const date_check = history_check.EventDate;

        if(date_check < now){
              
            return res.status(400).json({
                message:"You cannot cancel the tickets of the Event ! cancellation unavialable"
            })
        }

        const number_of_tickets_booked = history_check.TotalTickets;
        
        const find_Event = await Event_data.findOne({_id:event_id});
         
        find_Event.TotalTickets  = find_Event.TotalTickets + number_of_tickets_booked ; 

        find_Event.save();

        history_check.status = "Cancelled";
        history_check.save();

        return res.status(200).json({
            message:"Tickets Cancelled Successfully ! Refund Initiated"
        })



    }
    catch(er){
         
        return res.status(500).json({
            message:"Internal Server Error",
            error:er
        })
    }
})







export default Ticket_Router;
