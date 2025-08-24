import mongoose from "mongoose";


const ConnectDb = async ()=>{
       
    
    try{

        await mongoose.connect("mongodb://localhost:27017/EventPlanner",{
             useNewUrlParser: true,
           useUnifiedTopology: true,
        })
        console.log("MongoDB connected")

    }
    catch(er){
        console.log("Error Exists " , er);
        process.exit(1);
    }
}



export default ConnectDb;