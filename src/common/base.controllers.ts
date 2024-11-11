import express, { Router, Request, Response, NextFunction } from "express";

export default abstract class BaseController {
    public static getRouter(): Router {
        const router = express.Router();

        for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            const httpMethod = Reflect.getMetadata("httpMethod", this, key) as keyof Router;
            const path = Reflect.getMetadata("url", this, key) || "";
            const statusCode = Reflect.getMetadata("statusCode", this, key) || 200;
            const middlewares = Reflect.getMetadata("middlewares", this, key) || [];

            console.log(key);
            
            if (httpMethod && path) {
                (router[httpMethod] as (...args: any[]) => Router)(path, ...middlewares, async (req: Request, res: Response, next: NextFunction) => {
                    try {
                        const result = await (this as any)[key](req, res, next);
                        if (statusCode) {
                            res.status(statusCode);
                        }
                        res.send(result);
                    } catch (error) {
                        next(error);
                    }
                });
            }
        }
        return router;
    }
}