import express from 'express';
import Authentication_token from '../middlewares/Authentication.js';
import Event_data from '../Mongodb/Events_data.js';
import Users_history from '../Mongodb/User_History.js';
import mongoose from 'mongoose';
import DateConversion from '../middlewares/Date_conversion.js';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
const Ticket_Router = express.Router();
let email = null; // Replace with actual email if needed


let transporter = nodemailer.createTransport({
  host: email ? "smtp.gmail.com" : "smtp.ethereal.email",
  port: 465,
  secure: true,
  auth: {
    user: email ? "myrealemail@gmail.com" : "your_ethereal_email@ethereal.email",
    pass: email ? "abcd efgh ijkl mnop" : "your_ethereal_password",
  },
});



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
    email  =req.user.email;

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
        EventId: event._id,
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
    EventId: event._id,
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

  let mailOptions = {
    from: "Event@gmail.com",
    to: email,
    subject: "Hello from Node.js",
    text: "This is a test email sent from Node.js using Nodemailer!",
    html: "<b>This is a test email sent from Node.js using Nodemailer!</b>",
  };

  transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log("❌ Error: " + error);
  }
  console.log("✅ Email sent: " + info.response);
});

    return res.status(200).json({
      message: "Tickets Booked Successfully",
      event: {
        event_id: event._id,
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











Ticket_Router.post("/cancelTicket", Authentication_token, async (req, res) => {
  try {
    let { event_id, history_id } = req.body;
   

    if (
      !mongoose.Types.ObjectId.isValid(event_id) ||
      !mongoose.Types.ObjectId.isValid(history_id)
    ) {
      return res.status(400).json({
        message: "Invalid Event ID or History ID",
      });
    }

    event_id = new mongoose.Types.ObjectId(event_id);
    history_id = new mongoose.Types.ObjectId(history_id);

    // 1️⃣ Find the user with this history entry
    const userHistory = await Users_history.findOne({
      userId: req.user.userId,
      "history._id": history_id,
    });

    if (!userHistory) {
      return res.status(400).json({
        message: "You have not booked any tickets to this Event!",
      });
    }

    // 2️⃣ Get the specific history item
    const historyItem = userHistory.history.id(history_id);

    if (!historyItem) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 3️⃣ Check if event date is already past
    const eventDate = DateConversion(historyItem.EventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (eventDate < today) {
      return res.status(400).json({
        message: "You cannot cancel tickets for past events!",
      });
    }

    // 4️⃣ Update Event tickets
    const eventDoc = await Event_data.findById(event_id);
    if (!eventDoc) {
      return res.status(404).json({ message: "Event not found" });
    }

    eventDoc.TotalTickets += historyItem.Totaltickets;
    await eventDoc.save();

    // 5️⃣ Update history status
    historyItem.Status = "Cancelled";
    await userHistory.save();

    return res.status(200).json({
      message: "Tickets Cancelled Successfully! Refund Initiated",
    });
  } catch (er) {
    console.error("🔥 Error in /cancelTicket:", er);
    return res.status(500).json({
      message: "Internal Server Error",
      error: er.message,
    });
  }
});

Ticket_Router.post("/Tickets_Update", Authentication_token, async (req, res) => {
  try {
    let { Event_id, tickets } = req.body;

    // Find event by ID
    const find_event = await Event_data.findById(Event_id);

    if (!find_event) {
      return res.status(400).json({
        message: "Event Not Found",
      });
    }

    // Ensure tickets is a number
    tickets = parseInt(tickets);

    // Update total tickets
    find_event.TotalTickets += tickets;
    await find_event.save();

    return res.status(200).json({
      message: "Tickets Updated Successfully",
    });
  } catch (er) {
    console.error(er);

    return res.status(500).json({
      message: "Internal Server Error",
      error: er.message,
    });
  }
});




export default Ticket_Router;
