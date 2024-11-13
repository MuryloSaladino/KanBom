import "reflect-metadata";
import { IHttpMethod } from "../types/http.types";

export function Controller(route: string) {
    return function (constructor: Function) {
        Reflect.defineMetadata("route", route, constructor);
    }
}

export function Middlewares(middlewares: Array<Function>) {
    return function(target: any, propertyKey?: string) {
        if (propertyKey) {
            Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
        } else {
            Reflect.defineMetadata("middlewares", middlewares, target);
        }
    }
}

export function HttpMethod(method: IHttpMethod) {
    return function(target: any, propertyKey: string) {
        Reflect.defineMetadata("httpMethod", method, target, propertyKey);
    }
}

export function Route(path: string) {
    return function(target: any, propertyKey: string) {
        Reflect.defineMetadata("url", path, target, propertyKey);
    }
}

