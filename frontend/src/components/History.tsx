import axios from "axios";
import { useEffect, useState } from "react"



export default function History(){

    const[Message , setMessage] = useState('');
    const[data , setData] = useState([]);

    

    useEffect(()=>{

        async function get_history() {

            try{

                const response = await axios.get("http://localhost:5000/api/history/getAll_history",{
                    withCredentials:true,
                })
                console.log(response)

                if(response.status===200 && response.data.message ==='Data Fetched Successfully'){

                    console.log(response.data.history);
                    setData(response.data.history); 
                     
                }
                else{
                    setMessage("Failed to fetch the User History")
                }

            }
            catch(er){
                if (typeof er === "object" && er !== null && "response" in er) {
                    const error = er as any;
                if (error.response && error.response.data && error.response.data.message) {
                        console.error('Error fetching data:', error.response.data.message); 
                }
                 else {
                    console.error('An error occurred while fetching data:', er);
                    }
                } else {
                    console.error('An unexpected error occurred:', er);
                }
            }
            
        }

        get_history();

    },[])


    async function handleCancelTicket(EventId: String , history_id: String) {
        try {
            const response = await axios.post("http://localhost:5000/api/tickets/cancelTicket", {
                event_id: EventId,
                history_id: history_id
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                window.alert("Ticket cancelled successfully");
            } else {
                window.alert("Failed to cancel ticket");
            }
        } catch (error) {
            console.log("Error cancelling ticket:", error);
            window.alert(error);
        }
    }
        
    
      return(
            
        <div className="flex flex-col min-h-screen bg-gray-100 shadow-md px-5 py-4">
            <h1 className="text-xl font-bold text-center my-6">Booking History</h1>

           {Message && <p className="text-red-500 text-center text-md sm:text-xl mt-5">{Message}</p>}

           {data.length > 0 ? (
        <table className="w-full border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">S No</th>
              <th className="border px-4 py-2">Event Name</th>
              <th className="border px-4 py-2">Event Date</th>
              <th className="border px-4 py-2">Total Tickets</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Cancel Ticket</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item:any, index) => (
              <tr key={index} className="hover:bg-gray-100 items-center text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.EventName}</td>
                <td className="border px-4 py-2">{item.EventDate}</td>
                <td className="border px-4 py-2">{item.Totaltickets}</td>
                <td className="border px-4 py-2">{item.Status}</td>
               { item.Status==='Booked' && <td className="border px-4 py-2"><button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={() => handleCancelTicket(item.EventId ,item._id)}>Cancel</button></td> }
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !Message && <p className="text-red-500 text-center text-md sm:text-xl mt-5">No history found.</p>
      )}
                   
            
     
        </div>
      )
}