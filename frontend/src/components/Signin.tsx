import { useState } from "react";
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom";


export default function Signin(){

    const[message,setMessage] = useState('');
    const[email,setEmail] = useState('');
    const[Password,setPassword]=useState('');
    const navigate = useNavigate();
  

   async function SubmitForm(e:any) {
         
    e.preventDefault()

    try{
         const response = await axios.post("http://localhost:5000/api/auth/signin", {
             email:email,
             password:Password
         },{
            withCredentials: true
         });

    console.log(response)

    if(response.status === 200) {
        setMessage('Login successful');
        
    setTimeout(()=>{
        setMessage('')
        setEmail('')
        setPassword('')
    },3000)
       navigate("/home");
        
    } else {
        setMessage(response.data.message);
    }


}

  catch(er) {
    if (typeof er === "object" && er !== null && "response" in er) {
        const error = er as any;
        if (error.response && error.response.data && error.response.data.message) {
            setMessage(error.response.data.message);
        } else {
            console.log(er);
            setMessage('error in login');
        }
    } else {
        setMessage('error in login');
    }

    
    setTimeout(()=>{
        setMessage('')
        setEmail('')
        setPassword('')
    },3000)
}

   }
    return(
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md  sm:max-w-lg rounded-md px-8 shadow-2xl bg-white">

                <h1 className="font-bold  text-blue-700 text-center text-lg sm:text-xl mb-6 mt-5">Login Here</h1>

                <form className="space-y-5" onSubmit={SubmitForm}>

                    <div>
                        <label className="font-bold text-lg sm:text-xl block mb-1">
                            Email
                        </label>

                        <input onChange={(e)=>setEmail(e.target.value)}  value={email} className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"  placeholder="Enter your Email"  type="email"/>
                    </div>


                      <div>
                        <label className="font-bold text-lg sm:text-xl block mb-1">
                            Password
                        </label>

                        <input  onChange={(e)=>setPassword(e.target.value)} value={Password}  className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"  placeholder="Enter your Password"  type="Password"/>
                    </div>


                    <button className="text-center font-bold text-lg sm:xl  w-full rounded-lg bg-blue-500 text-white mb-5 px-3 py-2">
                        Login
                    </button>
                     
                </form>

                <div className="w-full mb-10 items-center justify-center text-center mt-3 ">

                   <p className="text-sm sm:text-lg text-gray-600">
                        Don’t have an account?{' '}
                    <Link to="/signup" className="text-blue-500 hover:underline cursor-pointer">
                        Sign up
                    </Link>
                    </p>

                </div>


                 {message && (

                    <p className="font-black text-center text-md sm:text-lg mb-10">{message}</p>
                )}

            </div>
           
        </div>
    )
}