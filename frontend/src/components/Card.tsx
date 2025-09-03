import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../Recoil/atoms/AuthAtom";
import { useRecoilValue } from "recoil";
export default function Card({ data }: any) {
  const [expanded, setExpanded] = useState(false);
  const image = data ? data.EventImage : "default.jpg";
  const imageUrl = `http://localhost:5000/uploads/${image}`;
  const[countTickets , getCountTickets] = useState(1);
  const admin = useRecoilValue(isAdmin);
  const navigate = useNavigate();
  


  function IncreaseTickets(){
      
     getCountTickets(countTickets+1);
  }

  function DecreaseTickets(){
       
    if(countTickets>1){
         getCountTickets(countTickets-1);
    }
  }




  async function TicketBuy(query_id:String , countTickets:Number){

     
    try{

      const response = await axios.post("http://localhost:5000/api/tickets/tickets_info", {
             query:query_id,
             Tickets:countTickets,
         },{
            withCredentials: true
         });

         if(response.status===200 && response.data.message==='Go for the Payment'){

             navigate("/payment" , { state: { Tickets : countTickets , Event_id : query_id , Price:data.Price}})
         }
         else{
            window.alert(response.data.message);
            navigate("/home")
         }
    }
    catch(er){
        
      console.log(er);
      window.alert("Error Occured");
      
    }
         
  }

  return (
    <div className="relative flex flex-col gap-4 items-center bg-white shadow-xl rounded-xl p-6 w-full max-w-sm sm:max-w-md hover:outline-1">
      {/* Image */}
      <div className="w-full h-60 rounded-lg overflow-hidden border-2 hover:-translate-y-2 transition duration-300">
        <img
         src={imageUrl}
         alt="Expanded Event"
         className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mt-2">
        {data.EventName}
      </h2>

      {/* Description */}
      <p className="text-gray-600 text-base text-center">
        {data.EventDescription}
      </p>

      {/* Expand button */}
      <div className="flex justify-between items-center gap-4">
        <button
          className="mt-3 px-4 py-2 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700 transition"
          onClick={() => setExpanded(true)}
        >
          View details
        </button>

        {admin && (
          <button
            className="mt-3 px-4 py-2 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700 transition"
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
              className="absolute top-4 right-4 text-xl bg-red-600 text-white rounded-lg px-3 py-1 hover:bg-red-700 transition"
              onClick={() => setExpanded(false)}
            >
              ✕
            </button>

            {/* Expanded Image */}
            <div className="w-full h-96 rounded-lg overflow-hidden border-2 mb-4">
              <img
                src={imageUrl}
                alt="Expanded Event"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Expanded Details */}
            
           

            <div className="flex  flex-col justify-between  gap-4">
              <p className="text-lg text-gray-500 w-full flex ">
                <span className="w-1/2 ">Event Date:</span>
                <span className="w-1/2 font-semibold text-black text-left">{data.EventDate}</span>
              </p>
              <p className="text-lg text-gray-500 w-full flex ">
                <span className="w-1/2 ">Venue:</span>
                <span className="w-1/2 font-semibold text-black text-left">{data.Venue}</span>
              </p>
              <p className="text-lg text-gray-500 w-full flex ">
                <span className="w-1/2 ">Start Time:</span>
                <span className="w-1/2 font-semibold text-black text-left">{data.StartTime}</span>
              </p>

               <p className="text-lg text-gray-500 w-full flex ">
                <span className="w-1/2 "> Organized By:</span>
                <span className="w-1/2 font-semibold text-black text-left">{data.OrganizedBy}</span>
              </p>


            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
              <p className="text-lg text-gray-500 ">
                Ticket Price: <span className="font-semibold text-black">{data.Price}</span>
              </p>
             
              <button className="px-4 py-2 border rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition" onClick={(e)=>TicketBuy(data._id , countTickets)}>
                Buy Ticket 
              </button>

              <div className="flex  gap-2  items-center cursor-pointer "> 
                
                <p className="text-xl border rounded-lg px-2.5 py-1 bg-gray-300" onClick={IncreaseTickets}>+</p>
                <p>{countTickets}</p>
                <p className="text-xl border rounded-lg px-3 py-1 bg-gray-300" onClick={DecreaseTickets}>-</p>

              </div>
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
