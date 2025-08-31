import axios from "axios";
import { useState } from "react";
import { useNavigate ,Link } from "react-router-dom";

export default function Signup(){

    const navigate = useNavigate();

    const[message,setMessage] = useState('');
    const[email,setEmail] = useState('');
    const[username,setUsername] = useState('');
    const[Password,setPassword] = useState('');
  

    async function submitForm(e:any) {
        e.preventDefault();

         try{
         const response = await axios.post("http://localhost:5000/api/auth/signup", {
             email:email,
             username:username,
             password:Password,
         },{
            withCredentials: true
         });

    console.log(response)

    if(response.status === 200) {
        setMessage('User Registered  successful');
        
    setTimeout(()=>{
        setMessage('')
        setEmail('')
        setPassword('')
        setUsername('')
    },3000)
        
        
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
            setMessage('error in login');
        }
    } else {
        setMessage('error in login');
    }

    
   setTimeout(()=>{
        setMessage('')
        setEmail('')
        setPassword('')
        setUsername('')
    },3000)
        
}
        
    }





    return(
        <div className="flex flex-col items-center py-30 bg-white px-4  mt-10">

            <div className="w-full max-w-md sm:max-w-lg rounded shadow-2xl bg-white px-8 ">

                <h1 className="font-bold  text-blue-700 text-center text-lg sm:text-xl mb-6 mt-5">Register Here</h1>

                <form className="space-y-5" onSubmit={submitForm}>

                    <div>
                        <label className="font-bold text-lg sm:text-xl block mb-1">
                            Email
                        </label>

                        <input  onChange={(e)=>setEmail(e.target.value)} value={email} required className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"  placeholder="Enter your Email"  type="email"/>
                    </div>

                    <div>
                        <label className="font-bold text-lg sm:text-xl block mb-1">
                            Username
                        </label>

                        <input onChange={(e)=>setUsername(e.target.value)} value={username} required className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"  placeholder="Enter Username"  type="text"/>
                    </div>



                      <div>
                        <label className="font-bold text-lg sm:text-xl block mb-1">
                            Password
                        </label>

                        <input onChange={(e)=>setPassword(e.target.value)} value={Password} required className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"  placeholder="Enter your Password"  type="Password"/>
                    </div>


                    <button className="text-center font-bold text-lg sm:xl  w-full rounded-lg bg-blue-500 text-white mb-5 px-3 py-2">
                        Login
                    </button>
                     
                </form>

                <div className="w-full mb-15 items-center justify-center text-center mt-3 py-5">

                   <p className="text-sm sm:text-lg text-gray-600 ">
                        Back to Login?{' '}
                    <Link to="/signin" className="text-blue-500 hover:underline cursor-pointer">
                        Sign In
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