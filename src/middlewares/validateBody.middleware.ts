import { NextFunction, Request, Response } from "express"
import { ZodTypeAny } from "zod"

export default function validateBody(schema:ZodTypeAny) {
    return (req:Request, _res:Response, next:NextFunction) => {

        const validated = schema.parse(req.body)
        req.body = validated

        return next()
    }
}