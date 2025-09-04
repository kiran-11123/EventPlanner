import { useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Update(){

    const location = useLocation();
    const { eventData } = location.state || {};
    const[Totaltickets , setTotaltickets] = useState(0);
    const[message , setMessage] = useState('');
    const navigate = useNavigate();


    async function UpdateTickets(e:any) {
        e.preventDefault();

        const response = await axios.post("http://localhost:5000/api/tickets/Tickets_Update" ,{
             Event_id : eventData._id ,
             tickets : Totaltickets,
        },{
            withCredentials:true
        })

        if(response.status===200 && response.data.message === 'Tickets Updated Successfully'){
               
            window.alert("Tickets Updated Successfully");
            navigate("/home")
            
        }

        else{
              
            setMessage(response.data.message);
            setTimeout(()=>{

                setMessage('');

            },2000)
        }

      

    }



    return(

        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md  sm:max-w-lg rounded-md px-8 shadow-2xl bg-white py-6 mt-10">

                <h1 className="font-bold  text-blue-700 text-center text-lg sm:text-xl mb-6 mt-5">Update Tickets</h1>

                <form className="space-y-5" onSubmit={UpdateTickets} >

                    <div>
                        <label className="font-bold text-lg sm:text-xl block mb-1">
                            Total Tickets
                        </label>

                        <input  onChange={(e) => setTotaltickets(Number(e.target.value))} className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"  placeholder="Enter total tickets" />
                    </div>



                    <button className="text-center font-bold text-lg sm:xl  w-full rounded-lg bg-blue-500 text-white mb-5 px-3 py-2">
                        Update
                    </button>
                     
                </form>

                 {message && (

                    <p className="font-black text-center text-md sm:text-lg mb-10">{message}</p>
                )}



            </div>
           
        </div>
         
    )
}