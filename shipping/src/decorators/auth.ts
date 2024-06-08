import { NextFunction, Response } from 'express';
import { ForbiddenError } from '../errors/http.errors';

export const Secured = () => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (req: any, res: Response, next: NextFunction) {
            console.log("Secured user", req.user);
            if (!req.user) {
                throw new ForbiddenError('User is not authenticated');
            }
            return originalMethod.apply(this, [req, res, next]);
        };
    };
};