import Card from "./Card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import axios from "axios";
import { useRecoilValue ,useResetRecoilState, useSetRecoilState } from "recoil";
import { isAdmin } from "../Recoil/atoms/AuthAtom";
import Cookies from "js-cookie";

export default function HomePage(){
    
    const navigate = useNavigate();
    const[data,setData] = useState([]);
    const[isfound , setIsfound] = useState(false);
    const admin = useRecoilValue(isAdmin);
   const setIsAdmin = useSetRecoilState(isAdmin);



    function Logout(){
        Cookies.remove("token");

        localStorage.clear();
        setIsAdmin(false);
        sessionStorage.clear();
        navigate("/", { replace: true });
       
          

    }

    function ToHistory(){
        navigate("/history");
    }
   

    useEffect(()=>{

        async function FetchData() {

            try{

            

            const response = await axios.get("http://localhost:5000/api/eventsData/allEvents" ,{
                withCredentials:true
            })

                            
            if (response.data.TotalData.length === 0) {
                 setIsfound(false);
            } 
            else {
                setIsfound(true);
                setData(response.data.TotalData);
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

      <div>
        <header
  className={`fixed top-0 left-0 w-full z-50 bg-white shadow-2xl h-20 rounded-lg px-4 py-2 flex items-center ${
    admin ? "justify-between gap-6" : "justify-between"
  }`}
>
  <h1 className="hidden sm:block text-blue-700 text-md sm:text-xl font-bold">
    Welcome to EventNest
  </h1>

  {admin && (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      onClick={ToEventUpload}
    >
      Add Event
    </button>
  )}

  <div className="flex gap-4 items-center w-full sm:w-auto justify-between sm:justify-end">
    {!admin && (
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={ToHistory}
      >
        History
      </button>
    )}
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      onClick={Logout}
    >
      Logout
    </button>
  </div>
</header>


  {/* Body Content */}
  <main className="flex flex-row flex-wrap items-center justify-center gap-6 px-8 py-6 pt-20 mt-5">
    {isfound ? (
      data.map((item, index) => (
        <div
          key={index}
          className="w-full sm:w-[400px] transition-all duration-300 ease-in-out hover:outline 
          hover:outline-2 hover:outline-blue-300 hover:border hover:border-blue-400 
          items-center hover:shadow-xl hover:shadow-gray-300/50 rounded-2xl"
        >
          <Card key={index} data={item} />
        </div>
      ))
    ) : (
      <p className="text-center text-lg sm:text-xl font-bold">No Events Found</p>
    )}
  </main>
</div>

    )
}