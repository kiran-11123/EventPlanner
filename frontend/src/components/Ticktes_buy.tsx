import axios from 'axios';
import React from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Ticktes_buy = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { Tickets, Event_id, Price } = location.state || {};

  const baseAmount = Price * Tickets;
  const cgst = baseAmount * 0.18;
  const sgst = baseAmount * 0.09;

  const TotalPrice = baseAmount + cgst + sgst;

  function GoToHome() {
    navigate("/home" ,{ replace: true });
  }


  async function BuyTickets() {


    try {

      const response = await axios.post("http://localhost:5000/api/tickets/bookTickets", {

        event_id: Event_id,
        tickets: Tickets,
        TotalPrice: TotalPrice

      }, {
        withCredentials: true
      })

      if (response.status === 200 && response.data.message === "Tickets Booked Successfully") {

        window.alert("Tickets Booked Successfully , details sent to your mail");

        /* const eventDetails = `

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
         */

        setTimeout(() => navigate("/home"), 500);

      }
      else {

        window.alert("Payment failed")
      }

    }
    catch (er) {

      console.log(er);
      window.alert("Something went wrong")
    }

  }
  return (
    <div className="flex flex-col items-center py-10 bg-white px-4 mt-10">
      {/* Payment Details */}
      <div className="w-full max-w-md sm:max-w-lg rounded-2xl shadow-xl bg-gray-100 p-8">
        <h1 className="text-lg sm:text-xl font-bold text-center border-b pb-3 mb-5">
          Payment Details
        </h1>

       <table className="w-full max-w-md border border-gray-300 shadow-md rounded-xl">
  <tbody className="bg-gray-200">
    <tr>
      <th className="border px-4 py-2 text-left bg-gray-300">Total Tickets</th>
      <td className="border px-4 py-2 text-left">{Tickets}</td>
    </tr>
    <tr>
      <th className="border px-4 py-2 text-left bg-gray-300">Price</th>
      <td className="border px-4 py-2 text-left"> ₹ {Price} </td>
    </tr>
    <tr>
      <th className="border px-4 py-2 text-left bg-gray-300">CGST</th>
      <td className="border px-4 py-2 text-left"> ₹ {cgst} </td>
    </tr>
    <tr>
      <th className="border px-4 py-2 text-left bg-gray-300">SGST</th>
      <td className="border px-4 py-2 text-left"> ₹ {sgst} </td>
    </tr>
    <tr>
      <th className="border px-4 py-2 text-left bg-gray-300">Total Pay</th>
      <td className="border px-4 py-2 text-left"> ₹ {TotalPrice} </td>
    </tr>
    <tr>
      <th className="border px-4 py-2 text-left bg-gray-300">Cancel Ticket</th>
      <td className="border px-4 py-2">
        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700" onClick={GoToHome}>
          Cancel
        </button>
      </td>
    </tr>
  </tbody>
</table>

</div>

      {/* Payment Methods */}
      <div className="mt-10 w-full max-w-md sm:max-w-lg bg-gray-300 shadow-lg rounded-md px-4 py-2 
                grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:justify-evenly sm:items-center">
        <button
          className="w-full sm:w-20 px-1 py-2 rounded-xl bg-blue-500 text-white shadow-md font-semibold hover:bg-blue-700"
          onClick={BuyTickets}
        >
          <img src="phonepe.png" alt="PhonePe" className="h-10 mx-auto mb-1" />
        </button>
        <button
          className="w-full sm:w-20 px-1 py-2 rounded-xl bg-blue-500 text-white shadow-md font-semibold hover:bg-blue-700"
          onClick={BuyTickets}
        >
          <img src="gpay.png" alt="GPay" className="h-10 mx-auto mb-1 rounded-full" />
        </button>
        <button
          className="w-full sm:w-20 px-1 py-2 rounded-xl bg-blue-500 text-white shadow-md font-semibold hover:bg-blue-700"
          onClick={BuyTickets}
        >
          <img src="paytm.jpg" alt="PayTm" className="h-10 mx-auto mb-1 rounded-full" />
        </button>
        <button
          className="w-full sm:w-20 px-1 py-2 rounded-xl bg-blue-500 text-white shadow-md font-semibold hover:bg-blue-700"
          onClick={BuyTickets}
        >
          <img src="debit.jpg" alt="Card" className="h-10 mx-auto mb-1 rounded-full" />
        </button>
      </div>

    </div>


  )
}

export default Ticktes_buy