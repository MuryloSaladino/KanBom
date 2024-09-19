import { NextFunction, Request, Response } from "express"
import AppError from "../errors"
import { ZodError } from "zod"

export const handleError = (err:Error, req:Request, res:Response, next:NextFunction) => {

    if(err instanceof AppError) {
        res.status(err.statusCode).json({ message: err.message })
    }

    if(err instanceof ZodError) {
        res.status(400).json({ message: err.flatten().fieldErrors })
    }

    console.log(err)
    return res.status(500).json({ message: "Internal Server Error" })
}