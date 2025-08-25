import Card from "./Card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import axios from "axios";

export default function HomePage(){
    
    const navigate = useNavigate();
    const[data,setData] = useState([]);
    const[isfound , setIsfound] = useState(true);
   

    useEffect(()=>{

        async function FetchData() {

            try{

            console.log("Fetching data from backend...");

            const response = await axios.get("http://localhost:5000/api/eventsData/allEvents" ,{
                withCredentials:true
            })

            console.log(response)
            
            if(response.status===200){
                setIsfound(true);
                 
                setData(response.data.TotalData);
            }
            else{
                setIsfound(false);
            }

        }
        catch(er){
             if (typeof er === "object" && er !== null && "response" in er) {
        const error = er as any;
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error fetching data:', error.response.data.message); 
        } else {
           console.error('An error occurred while fetching data:', er);
        }
    } else {
        console.error('An unexpected error occurred:', er);
    }
        }
        
        }

        FetchData();

    },[])

    function ToEventUpload(){
        navigate("/eventupload");
    }


     
    return(
        <div className="flex flex-col items-center  min-h-screen bg-gray-200 ">

            <header className="flex items-center justify-between w-full bg-white shadow-2xl h-20  rounded-lg px-4 py-2 ">

                <h1 className="text-blue-700 text-md sm:text-xl font-bold ">Welcome to Home </h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg " onClick={ToEventUpload}>Add Event</button>

            </header>

            <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-6 scroll-auto sm:flex-wrap gap-4 ">

              {isfound ? data.map((item,index)=>(

                     <div key={index} className="basis-1/3">
                         <Card  />
                    </div> 
                )) : <p className="text-center sm:text-xl text-md font-bold  ">No Events Found</p>}

            </div>
            
        </div>
    )
}