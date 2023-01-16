import {Request, Response }  from "express";
import { public_path } from "../config/public_path";
const createError = require('http-errors')
export const auth = async (req:Request, res:Response, next:any)=>{
    //console.log(req.path)
    if (public_path.includes(req.path)) { // check public path 
        return next()
    }
    //check authorization
    if (!req.headers.authorization) {
        //console.log("sdasdasd")
        return next(createError(407, 'Proxy Authentication Required!'))
    }
    next()
}