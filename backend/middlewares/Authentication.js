import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const secret = process.env.SECRET_KEY;

const Authentication_token = (req,res,next)=>{

    const token = req.cookies?.token;
    console.log("Token from cookie:", token);

    if(!token){
         return res.status(401).json({
            message:"Unauthorized: No token found"
         })
    }

    try{

        const decoded = jwt.verify(token,secret);

        req.user = decoded; 
        next();

    }
    catch(er){

        return res.status(401).json({
            message:"Invalid token",
            error:er
        })
    }

}

export default Authentication_token;