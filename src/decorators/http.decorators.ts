import "reflect-metadata";
import { IHttpMethod } from "../types/http.types";

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

export function StatusCode(code: number) {
    return function(target: any, propertyKey: string) {
        Reflect.defineMetadata("statusCode", code, target, propertyKey);
    };
}

export function Middlewares(middlewares: Array<Function>) {
    return function(target: any, propertyKey: string) {
        Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
    };
}