import "reflect-metadata";
import { IHttpMethod } from "../types/http.types";

export function Controller(route: string) {
    return function (constructor: Function) {
        Reflect.defineMetadata("route", route, constructor);
    };
}

export function RouteMiddlewares(middlewares: Array<Function>) {
    return function(target: any, propertyKey: string) {
        Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
    };
}

export function ControllerMiddlewares(middlewares: Array<Function>) {
    return function(constructor: Function) {
        Reflect.defineMetadata("middlewares", middlewares, constructor);
    };
}

export function HttpMethod(method: IHttpMethod) {
    return function(target: any, propertyKey: string) {
        Reflect.defineMetadata("httpMethod", method, target, propertyKey);
    };
}

export function Route(path: string) {
    return function(target: any, propertyKey: string) {
        Reflect.defineMetadata("url", path, target, propertyKey);
    };
}

