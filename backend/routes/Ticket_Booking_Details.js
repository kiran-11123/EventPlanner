import express from 'express';
import Authentication_token from '../middlewares/Authentication.js';
import Event_data from '../Mongodb/Events_data.js';
import Users_history from '../Mongodb/User_History.js';
import mongoose from 'mongoose';
const Ticket_Router = express.Router();
const  now= new Date()


Ticket_Router.post("/tickets_info" , Authentication_token , async(req,res)=>{

   
    const {query , Tickets} = req.body;

    if(!mongoose.Types.ObjectId.isValid(query)){
        return res.status(400).json({
            message:"Invalid Event ID"
        });
    }

    const event_id = new mongoose.Types.ObjectId(query);

    const find_query = await Event_data.find({_id:event_id});

    if(!find_query){
         return res.status(404).json({
            message:"Event Not Found"
         })
    }

    const ticket_count = parseInt(Tickets);

    if(find_query.TotalTickets < ticket_count ){
         return res.status(400).json({
            message:`only ${find_query.TotalTickets} left`
         })
    }

    return res.status(200).json({
        message:"Go for the Payment"
    })
       
})

Ticket_Router.post("/bookTickets",Authentication_token , async (req, res) => {
  try {
    

    let { event_id, tickets, TotalPrice } = req.body;

    if(!mongoose.Types.ObjectId.isValid(event_id)){
        return res.status(400).json({
            message:"Invalid Event ID"
        });
    }

     event_id = new mongoose.Types.ObjectId(event_id);
   

    if (!event_id || !tickets || !TotalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const event = await Event_data.findById({_id: event_id});
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.TotalTickets < tickets) {
      return res.status(400).json({
        message: `Only ${event[0].TotalTickets} tickets left`
      });
    }
   
    event.TotalTickets -= tickets;
    await event.save();

    const find_user = await Users_history.findOne({userId : req.user.userId});

    if (!find_user) {
    const new_user = new Users_history({
    userId: req.user.userId,
    history: [
      {
        EventName: event.EventName,
        EventDate: event.EventDate,
        Duration: event.Duration,
        OrganizedBy: event.OrganizedBy,
        StartTime: event.StartTime,
        EndTime: event.EndTime,
        Totaltickets: tickets,
        Status: "Booked",
        bookedAt: new Date()
      }
    ]
  });

  await new_user.save();
} else {
  find_user.history.push({
    EventName: event.EventName,
    EventDate: event.EventDate,
    Duration: event.Duration,
    OrganizedBy: event.OrganizedBy,
    StartTime: event.StartTime,
    EndTime: event.EndTime,
    Totaltickets: tickets,
    Status: "Booked",
    bookedAt: new Date()
  });

  await find_user.save();
}

    return res.status(200).json({
      message: "Tickets Booked Successfully",
      event: {
        event_name: event.EventName,
        event_date: event.EventDate,
        venue: event.Venue,
        tickets: tickets,
        totalPrice: TotalPrice,
        BookedBy: req.user.username
      }
    });
  } catch (error) {
    console.error("🔥 Error in /bookTickets:", error); // more clear
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});












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
