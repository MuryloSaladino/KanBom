import { NextFunction, Request, Response } from "express"
import AppError from "../errors"
import { ZodError } from "zod"

export default function handleError(err:Error, _req:Request, res:Response, next:NextFunction) {
    switch (err.constructor) {
        case AppError:
            const appError = err as AppError;
            return res.status(appError.statusCode).json({ message: err.message })
        case ZodError:
            const zodError = err as ZodError;
            return res.status(400).json({ message: zodError.flatten().fieldErrors })
        default:
            return res.status(500).json({ message: "Internal Server Error" })
    }
}
