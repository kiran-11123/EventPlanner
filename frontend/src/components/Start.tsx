import { useNavigate } from "react-router-dom";
export default function Home() {

  const navigate = useNavigate();

  function ToSignin(){
    navigate("/signin")
  }

  function ToSignup(){
    navigate("/signup")
  }

  return (
    <div className="flex flex-col min-h-screen bg-white shadow-2xl">
       
       
      <div className="w-full flex justify-between items-center px-8 py-4 shadow-2xl  rounded-md bg-blue-500 h-20 text-white ">

        <div className="text-lg font-bold text-md sm:text-2xl   ">
             EventNest
        </div>

        <div className="font-bold text-md sm:text-xl flex gap-4">
            <button className="px-3 py-2 border shadow-2xl cursor-pointer rounded-xl hover:border-blue-500" onClick={ToSignin}>
              Login
            </button>
            <button className="px-3 py-2 border shadow-2xl cursor-pointer rounded-xl hover:border-green-500" onClick={ToSignup}>
              Register
            </button>
          </div>

      </div>


      <div className="flex flex-col items-center justify-center flex-grow text-center px-4 py-2 shadow-2xl">

         <div className="text-xl sm:text-2xl font-extrabold mb-5 ">

          Welcome to the EventNest !! A hub for all Events 

         </div>

         <p className="text-lg sm:text-xl font-bold text-gray-600 max-w-xl sm:max-w-2xl">
          Your one-stop platform to explore upcoming events , book tickets instantly , and never miss out on what's happening around you
          </p>


          
      </div>


       <footer className="text-sm bg-gray-800 text-white sm:text-2xl  text-center px-6 py-4">

         <p>&copy; {new Date().getFullYear()} EventNest. All rights reserved.</p>

     </footer>
          
       

    </div>
  );
}
