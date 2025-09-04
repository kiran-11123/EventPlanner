import { useState } from "react"
import { useLocation } from "react-router-dom"
export default function Update(){

    const location = useLocation();
    const { eventData } = location.state || {};
    const[message , setMessage] = useState('');


    return(

        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md  sm:max-w-lg rounded-md px-8 shadow-2xl bg-white">

                <h1 className="font-bold  text-blue-700 text-center text-lg sm:text-xl mb-6 mt-5">Update Tickets</h1>

                <form className="space-y-5" >

                    <div>
                        <label className="font-bold text-lg sm:text-xl block mb-1">
                            Total Tickets
                        </label>

                        <input  className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"  placeholder="Enter total tickets"  type="number"/>
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