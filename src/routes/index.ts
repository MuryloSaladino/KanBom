import { Router } from "express"
import controllers from "../controllers"

export default function getControllers(): Router {
    const mainRouter = Router();

    controllers.forEach(ControllerClass => {
        const instance = new ControllerClass();
        const routePrefix = Reflect.getMetadata("route", ControllerClass);        
        const router = Router();
        
        for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(instance))) {
            const httpMethod = Reflect.getMetadata("httpMethod", instance, key) as keyof Router;
            const path:string = Reflect.getMetadata("url", instance, key) || "";
            const middlewares = Reflect.getMetadata("middlewares", instance, key) || [];

            console.log(key);
            

            if (httpMethod) {
                (router[httpMethod] as (...args: any[]) => Router)(
                    path, ...middlewares, instance[key as keyof typeof instance]()
                );
            }
        }

        mainRouter.use(routePrefix, router)
    })

    return mainRouter;
}