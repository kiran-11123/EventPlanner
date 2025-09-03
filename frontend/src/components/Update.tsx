import { useState } from "react"
import { useLocation } from "react-router-dom"
export default function Update(){

    const location = useLocation();
    const { eventData } = location.state || {};

    return(
         <div className="flex flex-col px-5 py-5 bg-gray-300 min-h-screen shadow-md">

            <h1 className="text-md sm:text-2xl font-bold text-center">Update Event</h1>

             <div className="flex  flex-col gap-4 bg-white max-w-xl sm:max-w-2xl mx-auto p-6 rounded-lg shadow-md mt-5">

                      


             </div>

            <div>

            </div>
           
         </div>
    )
}