import { NextFunction, Request, Response, Router } from "express"
import controllers from "../controllers"

export default function getControllers(): Router {
    const mainRouter = Router();

    controllers.forEach(ControllerClass => {
        const instance = new ControllerClass();
        const routePrefix = Reflect.getMetadata("route", ControllerClass);        
        const controllerMiddlewares:((req:Request, res:Response, next:NextFunction) => Promise<void>)[] = Reflect.getMetadata("middlewares", ControllerClass) || [];        
        const router = Router();

        controllerMiddlewares.forEach(middleware => router.use(middleware))

        Object.keys(instance).forEach(key => {
            const httpMethod = Reflect.getMetadata("httpMethod", instance, key) as keyof Router;
            const path:string = Reflect.getMetadata("url", instance, key) || "";
            const middlewares = Reflect.getMetadata("middlewares", instance, key) || [];

            const task = instance[key as keyof typeof instance] as (req: Request, res: Response) 
                => Promise<Response<any, Record<string, any>>>;
            
            if (httpMethod) {
                (router[httpMethod] as (...args: any[]) => Router)(
                    path, ...middlewares, task.bind(instance)
                );
            }
        })
        mainRouter.use(routePrefix, router)
    })

    return mainRouter;
}