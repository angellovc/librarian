import { Request, Response, NextFunction } from "express"
import { Schema } from "joi";
import boom from '@hapi/boom';

const validatorHandler = (schema:Schema, property:string) => {

    return (request:Request, response:Response, next:NextFunction) => {
        let data;
        if (property === 'params') {
            data = request.params;
        }
        if (property === 'query') {
            data = request.query;
        }
        if (property === 'body') {
            data = request.body;
        }

        const {error} = schema.validate(data, {abortEarly: false})
        if (error) {
            next(boom.badRequest(error.message));
        }
        next();
    }
}

export {
    validatorHandler
}