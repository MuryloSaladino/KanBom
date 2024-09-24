import { NextFunction, Request, RequestHandler, Response } from "express";
import AppError from "../errors";

export function passOne(...args:RequestHandler[]) {
    return async (req:Request, res:Response, next:NextFunction): Promise<void> => {
        
        let error:Error = new AppError("Something went wrong in your request", 400)

        args.forEach(middleware => {
            try {
                middleware(req, res, () => {})
                next()
            } catch (e) {
                if(e instanceof AppError) error = e
            }
        });

        throw error;
    }
}