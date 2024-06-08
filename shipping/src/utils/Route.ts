import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';

export const Controller = (prefix: string) => {
    return (target: any) => {
        Reflect.defineMetadata('prefix', prefix, target);

        if (!Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target);
        }
    };
};

export const Get = (path: string) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }

        const routes = Reflect.getMetadata('routes', target.constructor) as Array<any>;
        routes.push({
            method: 'get',
            path,
            handlerName: propertyKey
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
};

export const applyRoutes = (router: any, controller: any) => {
    const instance = new controller();
    const prefix = Reflect.getMetadata('prefix', controller);
    const routes = Reflect.getMetadata('routes', controller);

    routes.forEach((route: any) => {
        const fullPath = prefix + route.path;
        const handler = (req: Request, res: Response, next: NextFunction) => {
            instance[route.handlerName](req, res, next);
        };

        router[route.method](fullPath, handler);
    });
};
