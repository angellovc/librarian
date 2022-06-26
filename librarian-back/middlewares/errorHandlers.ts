import { NextFunction, Request, Response } from "express";
import { QueryFailedError } from "typeorm";

const errorHandler = (error: any, request:Request, response:Response, next:NextFunction) => {
    response.status(500).json({
        statusCode: 500,
        message: 'Unexpected error. Please contact the Administrator',
        error: 'Internal Error'
    });
}

const boomErrorHandler = (error: any, request:Request, response:Response, next:NextFunction) => {
    if (error.isBoom) {
        const {statusCode, payload} = error.output;
        response.status(statusCode).json(payload);
        return;
    } else {
        next(error);
    }
}
const ormErrorHandler = (error:any, request:Request, response:Response, next:NextFunction) => {
    if (error instanceof QueryFailedError) {
        response.status(409).json({
            statusCode: 409,
            message: error.message,
            error: error.driverError.detail
        })
    } else {
        next(error);
    }
}
export {
    errorHandler,
    boomErrorHandler,
    ormErrorHandler
}