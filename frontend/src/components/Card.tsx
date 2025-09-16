import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../Recoil/atoms/AuthAtom";
import { useRecoilValue } from "recoil";
import { MdThumbUp, MdThumbUpOffAlt } from 'react-icons/md';
export default function Card({ data }: any) {
  const [expanded, setExpanded] = useState(false);
  const image = data ? data.EventImage : "default.jpg";
  const imageUrl = `http://localhost:5000/uploads/${image}`;
  const [countTickets, getCountTickets] = useState(1);
  const admin = useRecoilValue(isAdmin);
  const navigate = useNavigate();







  function IncreaseTickets() {

    getCountTickets(countTickets + 1);
  }

  function DecreaseTickets() {

    if (countTickets > 1) {
      getCountTickets(countTickets - 1);
    }
  }




  async function TicketBuy(query_id: String, countTickets: Number) {


    try {



      const response = await axios.post("http://localhost:5000/api/tickets/tickets_info", {
        query: query_id,
        Tickets: countTickets,
      }, {
        withCredentials: true
      });

      if (response.status === 200 && response.data.message === 'Go for the Payment') {

        navigate("/payment", { state: { Tickets: countTickets, Event_id: query_id, Price: data.Price } })
      }
      else {
        window.alert(response.data.message);
        navigate("/home")
      }
    }
    catch (er) {

      console.log(er);
      window.alert("Error Occured");

    }

  }

  return (
    <div className="relative flex flex-col gap-4 items-center bg-white shadow-xl rounded-xl p-6 w-full max-w-sm  hover:outline-1">
      {/* Image */}
      <div className="w-full h-60 rounded-lg overflow-hidden border-2 ">
        <img
          src={imageUrl}
          alt="Expanded Event"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <h2 className="text-sm sm:text-md font-bold text-gray-700 mt-2 font-mono">
        {data.EventName}
      </h2>


      {/* Expand button */}
      <div className="flex justify-between items-center gap-4">

        <button
          className={` px-4 py-2 rounded-lg font-mono bg-blue-600 text-white hover:bg-blue-700 transition mt-1 `}
          onClick={() => setExpanded(true)}
        >
          View details
        </button>

        {admin && (
          <button
            className="mt-1 px-4 py-2 rounded-lg font-mono bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={() => navigate("/update", { state: { eventData: data } })}
          >
            Update
          </button>
        )}
      </div>

      {/* Expanded Overlay */}
      {expanded && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 overflow: hidden;">
          <div className="relative bg-white p-6 rounded-xl shadow-2xl w-full max-w-3xl">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-sm bg-red-500 text-white rounded-full px-3 py-2 hover:bg-red-700 transition"
              onClick={() => setExpanded(false)}
            >
              ✕
            </button>

            {/* Expanded Image */}
            <div className="w-full flex-col h-120 rounded-lg overflow-hidden border-2 mb-4 items-start px-2 shadow-lg py-2">


              <div className="flex  flex-row  flex-1 h-32  p-4  justify-start items-center  gap-4 font-serif text-lg">

                <div className="w-32  h-32 rounded-full overflow-hidden border-2">
                  <img
                    src={imageUrl}
                    alt="Expanded Event"
                    className="w-32 h-32 rounded-full border-4 border-green-500 object-cover"
                  />

                </div>

                <div className="flex    flex-col  flex-1 h-32  p-4  items-start  gap-2 ">

                  <p className="text-sm text-gray-500 w-full   hidden sm:block">
                    <span className="px-2">Event Description:</span>
                    <span className=" font-semibold text-mono text-sm text-left">{data.EventDescrption}</span>
                  </p>

                </div>

              </div>

              <div className=" mt-1 font-mono text-md">

                <div className="w-full border rounded-lg shadow bg-white">
                  <div className="divide-y">
                    <div className="grid grid-cols-[30%_1fr] gap-4 p-3">
                      <div className="font-semibold text-gray-700">Event Date</div>
                      <div className="text-gray-600">{data.EventDate}</div>
                    </div>

                    <div className="grid grid-cols-[30%_1fr] gap-4 p-3">
                      <div className="font-semibold text-gray-700">Venue</div>
                      <div className="text-gray-600">{data.Venue}</div>
                    </div>

                    <div className="grid grid-cols-[30%_1fr] gap-4 p-3">
                      <div className="font-semibold text-gray-700">Start Time</div>
                      <div className="text-gray-600">{data.StartTime}</div>
                    </div>

                    <div className="grid grid-cols-[30%_1fr] gap-4 p-3">
                      <div className="font-semibold text-gray-700">Organized by</div>
                      <div className="text-gray-600">{data.OrganizedBy}</div>
                    </div>

                    <div className="grid grid-cols-[30%_1fr] gap-4 p-3">
                      <div className="font-semibold text-gray-700">Price</div>
                      <div className="text-gray-600">{data.Price}</div>
                    </div>


                  </div>
                </div>



              </div>


            </div>

            {/* Expanded Details */}





            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-6 bg-white shadow-md border rounded-xl p-4">
              {/* Buy Button */}
              <button
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow hover:from-blue-700 hover:to-blue-600 transition-transform transform hover:scale-105"
                onClick={(e) => TicketBuy(data._id, countTickets)}
              >
                🎟️ Buy Ticket
              </button>

              {/* Ticket Counter */}
              <div className="flex items-center gap-4">
                <button
                  className="w-10 h-10 flex items-center justify-center text-lg font-bold border rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                  onClick={IncreaseTickets}
                >
                  +
                </button>

                <p className="text-lg font-semibold text-gray-800">{countTickets}</p>

                <button
                  className="w-10 h-10 flex items-center justify-center text-lg font-bold border rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                  onClick={DecreaseTickets}
                >
                  –
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
