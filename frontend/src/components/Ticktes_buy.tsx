import axios from 'axios';
import React from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Ticktes_buy = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const { Tickets, Event_id ,Price } = location.state || {};
  
  const baseAmount = Price * Tickets;
  const cgst = baseAmount * 0.18;
  const sgst = baseAmount * 0.09;

  const TotalPrice = baseAmount + cgst + sgst;


  async function BuyTickets() {

       
     try{

      const response  = await axios.post("http://localhost:5000/api/tickets/bookTickets",{

        event_id: Event_id,
        tickets: Tickets,
        TotalPrice : TotalPrice

      },{
           withCredentials: true
      })

      if(response.status===200 && response.data.message=== "Tickets Booked Successfully"){
           
              window.alert("Tickets Booked Successfully")

              const eventDetails = `

              Event Name: ${response.data.event.event_name}
              Booked By : ${response.data.event.BookedBy}
              Date: ${response.data.event.event_date}
              Venue: ${response.data.event.venue}
              Tickets Booked: ${response.data.event.tickets}
              Total Price: ${response.data.event.totalPrice}
              `;

             
              const blob = new Blob([eventDetails], { type: "text/plain" });
              const url = URL.createObjectURL(blob);

             
              const link = document.createElement("a");
              link.href = url;
              link.download = `${response.data.event.event_name}_Booking_Details.txt`; 
              link.click();

              
              URL.revokeObjectURL(url);

             setTimeout(() => navigate("/home"), 500);

      }
      else{
           
        window.alert("Payment failed")
      }

     }
     catch(er){
         
        console.log(er);
        window.alert("Something went wrong")
     }
    
  }
  return (
        <div className="flex flex-col items-center py-10 bg-white px-4 mt-10">
          <div className="w-full max-w-md sm:max-w-lg rounded-2xl shadow-xl bg-gray-100 p-8">
            
            
            <h1 className="text-lg sm:text-xl font-bold text-center border-b pb-3 mb-5">
              Payment Details
            </h1>

            
            <div className="divide-y">

              <div className="flex justify-between py-3">
                <p className="font-semibold">Total Tickets</p>
                <p>{Tickets}</p>
              </div>

              <div className="flex justify-between py-3">
                <p className="font-semibold">Price</p>
                <p>$ {Price}</p>
              </div>

              <div className="flex justify-between py-3">
                <p className="font-semibold">CGST</p>
                <p>$ {cgst}</p>
              </div>

              <div className="flex justify-between py-3">
                <p className="font-semibold">SGST</p>
                <p>$ {sgst}</p>
              </div>

              <div className="flex justify-between py-3 font-bold text-green-600">
                <p>Total Pay</p>
                <p>$ {TotalPrice}</p>
              </div>

          </div>
        </div>


        <div className='flex items-center justify-evenly w-full mt-10 px-5 py-3 rounded-md border-1 bg-gray-300 max-w-3xl shadow-lg cursor-pointer'>

          <button className='px-4 py-2 border-1 rounded-md bg-blue-500 text-white shadow-md font-semibold hover:bg-blue-700' onClick={BuyTickets}>PhonePe</button>
          <button className='px-4 py-2 border-1 rounded-md bg-blue-500 text-white shadow-md font-semibold hover:bg-blue-700' onClick={BuyTickets}>GPay</button>
          <button className='px-4 py-2 border-1 rounded-md bg-blue-500 text-white shadow-md font-semibold hover:bg-blue-700' onClick={BuyTickets}>Debit Card</button>
          <button className='px-4 py-2 border-1 rounded-md bg-blue-500 text-white shadow-md font-semibold hover:bg-blue-700' onClick={BuyTickets}>Credit Card</button>


        </div>


</div>

  )
}

export default Ticktes_buy