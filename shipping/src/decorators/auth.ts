import { NextFunction, Response } from 'express';
import { ForbiddenError } from '../controllers/errors/http.errors';

export const Secured = () => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (req: any, res: Response, next: NextFunction) {
            if (!req.user) {
                res.status(403).send({
                    error: 'invalid_merchant_account',
                    error_description: 'User is not authenticated'
                });
                throw new ForbiddenError('User is not authenticated');
            }
            return originalMethod.apply(this, [req, res, next]);
        };
    };
};