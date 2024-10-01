import { NextFunction, Request, RequestHandler, Response } from "express";
import AppError from "../errors";

export function passOne(...args:RequestHandler[]) {
    return async (req:Request, res:Response, next:NextFunction): Promise<void> => {
        
        let error:Error = new AppError("Something went wrong in your request", 400)

        for(let i = 0; i < args.length; i++) {
            try {
                console.log(args[i]);
                args[i](req, res, () => {})
                return next()
            } catch (e) {
                if(e instanceof AppError) error = e
            }
        }

        // args.forEach(async (middleware) => {
        //     try {
        //         console.log(middleware);
        //         middleware(req, res, () => {})
        //         return next()
        //     } catch (e) {
        //         if(e instanceof AppError) error = e
        //     }
        // });

        throw error;
    }
}