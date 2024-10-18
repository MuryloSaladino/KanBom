import { NextFunction, Request, Response } from "express";
import AppError from "../errors";

export function passOne(...args:((req:Request, res:Response, next:NextFunction) => Promise<void>)[]) {
    return async (req:Request, res:Response, next:NextFunction): Promise<void> => {
        
        let error:Error = new AppError("Something went wrong in your request", 400)

        for(let i = 0; i < args.length; i++) {
            try {
                await args[i](req, res, () => {})
                next()
                return;
            } catch (e) {
                if(e instanceof AppError) error = e
            }
        }
        throw error;
    }
}