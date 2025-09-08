import express from 'express';
import Authentication_token from '../middlewares/Authentication.js';
import Event_data from '../Mongodb/Events_data.js';
import Users_history from '../Mongodb/User_History.js';
import mongoose from 'mongoose';
import DateConversion from '../middlewares/Date_conversion.js';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import QRCode from "qrcode";
const Ticket_Router = express.Router();
let email = null; // Replace with actual email if needed
import transporter from './Mail.js';

Ticket_Router.use(bodyParser.json());
Ticket_Router.use(bodyParser.urlencoded({ extended: true }));







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

import QRCode from "qrcode";

// Helper to generate QR as Promise
const generateQRCode = (data) => {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(data, (err, url) => {
      if (err) reject(err);
      else resolve(url);
    });
  });
};

Ticket_Router.post("/bookTickets", Authentication_token, async (req, res) => {
  try {
    let { event_id, tickets, TotalPrice } = req.body;
    const email = req.user.email;

    if (!mongoose.Types.ObjectId.isValid(event_id)) {
      return res.status(400).json({ message: "Invalid Event ID" });
    }

    const event = await Event_data.findById(event_id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.TotalTickets < tickets) {
      return res
        .status(400)
        .json({ message: `Only ${event.TotalTickets} tickets left` });
    }

    // Deduct tickets
    event.TotalTickets -= tickets;
    await event.save();

    // Save user booking history
    const find_user = await Users_history.findOne({ userId: req.user.userId });
    const bookingData = {
      EventId: event._id,
      EventName: event.EventName,
      EventDate: event.EventDate,
      Duration: event.Duration,
      OrganizedBy: event.OrganizedBy,
      StartTime: event.StartTime,
      EndTime: event.EndTime,
      Totaltickets: tickets,
      Status: "Booked",
      bookedAt: new Date(),
    };

    if (!find_user) {
      await new Users_history({
        userId: req.user.userId,
        history: [bookingData],
      }).save();
    } else {
      find_user.history.push(bookingData);
      await find_user.save();
    }

    // Generate QR
    const randomData = Math.random().toString(36).substring(2, 12);
    const qrUrl = await generateQRCode(randomData);
    const base64Data = qrUrl.split(",")[1];

    // Prepare email
    let mailOptions = {
      from: "eventnest.offical.main@gmail.com",
      to: email,
      subject: `🎟️ Ticket Confirmation for the show ${event.EventName}`,
      text: "Your ticket is booked successfully!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 15px; border: 1px solid #ddd; border-radius: 8px;">
          <h1 style="color: green;">Your ticket is booked successfully! ✅</h1>
          <p><strong>Event Name:</strong> ${event.EventName}</p>
          <p><strong>Event Date:</strong> ${event.EventDate}</p>
          <p><strong>Venue:</strong> ${event.Venue}</p>
          <p><strong>Number of Tickets:</strong> ${tickets}</p>
          <p><strong>Total Price:</strong> $${TotalPrice}</p>
          <p><strong>Booked By:</strong> ${req.user.username}</p>
          <p><b>Unique Ticket ID:</b> ${randomData}</p>
          <br/>
          <img src="cid:ticketqr" alt="QR Code" style="width:150px; height:150px;" />
        </div>
      `,
      attachments: [
        {
          filename: "ticket_qr.png",
          content: base64Data,
          encoding: "base64",
          cid: "ticketqr",
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully with QR Code");

    return res.status(200).json({
      message: "Tickets Booked Successfully",
      event: {
        event_id: event._id,
        event_name: event.EventName,
        event_date: event.EventDate,
        venue: event.Venue,
        tickets: tickets,
        totalPrice: TotalPrice,
        BookedBy: req.user.username,
      },
    });
  } catch (error) {
    console.error("🔥 Error in /bookTickets:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
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
