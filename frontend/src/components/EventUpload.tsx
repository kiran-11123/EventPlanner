
import axios from "axios";
import { useState } from "react";

export default function EventUpload(){

    const[EventName,SetEventName] = useState<string>('');
    const[EventImage,SetEventImage] = useState<File | null>(null);
    const[EventDate,SetEventDate] = useState<string>('');
    const[EventDuration,SetEventDuration] = useState<string>('');
    const[EventVenue,SetEventVenue] = useState<string>('');
    const[OrganizedBy,SetOrganizedBy] = useState<string>('');
    const[Start,setStart] = useState<string>('');
    const[End ,setEnd] = useState<string>('');
    const[EventType,SetEventType] = useState<string>('');
    const[TotalTickets,SetTotalTickets] = useState<number>(0);
    const[Price,SetPrice] = useState<number>(0);
    const[message,SetMessage] = useState<string>('');


    function ImageSetting(e:any){
        if(e.target.files && e.target.files.length>0 ){
            SetEventImage(e.target.files[0]);
        }
    }


    async function submitForm(e:any) {

        e.preventDefault();

        try{

            if(!EventImage){
                window.alert("Please upload Event Image");
                return;
            }

            const formData = new FormData();

            formData.append("EventName", EventName);
            formData.append("EventImage", EventImage);
            formData.append("EventDate", EventDate);
            formData.append("EventDuration", EventDuration);
            formData.append("EventVenue", EventVenue);
            formData.append("OrganizedBy", OrganizedBy);
            formData.append("Start", Start);
            formData.append("End", End);
            formData.append("EventType", EventType);
            formData.append("TotalTickets", TotalTickets.toString());
            formData.append("Price", Price.toString());


            const response = await axios.post("http://localhost:3000/api/eventUpload/upload" , formData,{
                withCredentials: true,
            });

            if(response.data.message){
            
            SetMessage(response.data.message);

            setTimeout(()=>{
                SetMessage('');

            },2000);

            if(response.data.success){
               SetMessage('Event uploaded successfully');
                SetEventName('');
                SetEventImage(null);
                SetEventDate('');
                SetEventDuration('');
                SetEventVenue('');
                SetOrganizedBy('');
                setStart('');
                setEnd('');
                SetEventType('');
                SetTotalTickets(0);
                SetPrice(0);
            }

        }
      


    }

      catch(er){
            console.log(er);
            SetMessage("Something went wrong")

        }

    }

    return(

        <div className="h-screen flex  items-center justify-center bg-gray-100 ">

            

            <div className="w-full max-w-sm sm:max-w-xl  p-6 rounded-md shadow-xl bg-white">

                <h1 className="text-md sm:text-xl font-semibold mb-4 text-center text-blue-700">Register your Event here</h1>

           
            <form  className="space-y-4" >
                <div className="flex items-center justify-between mb-2 gap-4">

                     <div>

                        <label className="block mb-1 text-gray-700 font-medium">Event Name</label>
                    <input 
                        type="text" 
                        required
                        placeholder="Event Name"  
                        className="w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e)=>SetEventName(e.target.value)} value={EventName}
                    />
                        
                    </div>

                    <div>
                    <label className="block mb-1 text-gray-700 font-medium">Image</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                         required
                        placeholder="Upload Image"  
                        className="w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={ImageSetting}
                    />
                    </div>

                   

                </div>

                <div className="w-full flex items-center  mb-2 gap-2">

                     <div className="max-w-1/2">

                        <label className="block mb-1 text-gray-700 font-medium">Event Date</label>
                    <input 
                        type="text" 
                         required
                        placeholder="Event Date"  
                        className="w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e)=>SetEventDate(e.target.value)} value={EventDate}
                    />
                        
                    </div>

                    <div className="max-w-1/2">
                    <label className="block mb-1 text-gray-700 font-medium">Duration</label>
                    <input 
                        type="text" 
                         required
                        placeholder="Duration"  
                        className="w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e)=>SetEventDuration(e.target.value)} value={EventDuration}
                    />
                    </div>

                   

                </div>

                <div className="w-full flex items-center  mb-2 gap-2">

                     <div className="max-w-1/2">

                        <label className="block mb-1 text-gray-700 font-medium">Venue</label>
                    <input 
                        type="text" 
                         required
                        placeholder="Venue"  
                        className="w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e)=>SetEventVenue(e.target.value)} value={EventVenue}
                    />
                        
                    </div>

                    <div className="max-w-1/2">
                    <label className="block mb-1 text-gray-700 font-medium">Organized By</label>
                    <input 
                        type="text" 
                         required
                        placeholder="Organized By"  
                        className="w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e)=>SetOrganizedBy(e.target.value)} value={OrganizedBy}
                    />
                    </div>

                   

                </div>


                <div className="w-full flex items-center  mb-2 gap-2">

                     <div className="max-w-1/2">

                        <label className="block mb-1 text-gray-700 font-medium">Start Time</label>
                    <input 
                        type="text" 
                         required
                        placeholder="Start Time"  
                        className="w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e)=>setStart(e.target.value)} value={Start}
                    />
                        
                    </div>

                    <div className="max-w-1/2">
                    <label className="block mb-1 text-gray-700 font-medium">End Time</label>
                    <input 
                        type="text" 
                         required
                        placeholder="End Time"  
                        className="w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e)=>setEnd(e.target.value)} value={End}
                    />
                    </div>

                    

                   

                </div>


                <div className="w-full flex items-center  mb-2 gap-2">

                     <div className="max-w-1/2">

                        <label className="block mb-1 text-gray-700 font-medium">Event Type</label>
                    <input 
                        type="text" 
                         required
                        placeholder="Event Type"  
                        className="w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e)=>SetEventType(e.target.value)} value={EventType}
                    />
                        
                    </div>

                    <div className="max-w-1/2">
                    <label className="block mb-1 text-gray-700 font-medium">Total Tickets</label>
                    <input 
                        type="text"
                         required 
                        placeholder="Total Tickets"  
                        className="w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e)=>SetTotalTickets(Number(e.target.value))} value={TotalTickets}
                    />
                    </div>

                   

                </div>

                <div className="w-full flex items-center justify-center mb-2 gap-2">

                     <div className="max-w-1/2">

                        <label className="block mb-1 text-gray-700 font-medium">price</label>
                    <input 
                        type="text" 
                         required
                        placeholder="price"  
                        className="w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e)=>SetPrice(Number(e.target.value))} value={Price}
                    />
                     </div>   

                </div>
               

                    
                <button type="submit" className="w-full text-center font-bold bg-green-400 text-white mt-4 px-3 py-2 rounded-md">Upload</button>

                   

            </form>

             </div>

             

            
        </div>
    )
}