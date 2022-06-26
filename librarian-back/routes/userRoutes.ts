import express, { NextFunction, Request, Response } from 'express';
import { paramUserSchema, patchUserSchema, updateCreateUserSchema } from '../middlewares/schemas/userSchema';
import { validatorHandler } from '../middlewares/validatorHandlers';
import {JWT_SECRET} from '../data/config';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import UserService from '../services/userService';

const router = express.Router();
const userService = new UserService();

router.get('/', 
    passport.authenticate('jwt', {session: false}),
    async (request:Request, response:Response, next:NextFunction) => {
        try {
            response.json(
                await userService.getAll()
            )
        } catch(error) {
            next(error);
        }
    }
);

router.get('/:userId',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(paramUserSchema, 'params'),
    async (request:Request, response:Response, next:NextFunction) => {
        const {userId} = request.params;
        try {
            response.json(
                await userService.get(userId)
            );
        } catch(error) {
            next(error);
        }
    }
);

router.get('/:userId/books', 
    passport.authenticate('jwt', {session: false}),
    validatorHandler(paramUserSchema, 'params'),
    async (request:Request, response:Response, next:NextFunction) => {
        const {userId} = request.params;
        try {
            response.json(
                await userService.get(userId, true)
            );
        } catch(error) {
            next(error);
        }
    }
);

router.post('/', 
    validatorHandler(updateCreateUserSchema, 'body'),
    async (request:Request, response:Response, next:NextFunction) => {
        try {
            const user = await userService.create(request.body);
            const payload = {
                id: user?.id,
            }
            const token = jwt.sign(payload, JWT_SECRET as string)
            response.json(
                {user, token}
            );
        } catch(error) {
            next(error);
        }
    }
);

router.put('/', 
    passport.authenticate('jwt', {session: false}),
    validatorHandler(updateCreateUserSchema, 'body'),
    async (request:Request, response:Response, next:NextFunction) => {
        const {id: userId} = request.user as any;
        try {
            response.json(
                await userService.update(userId, request.body)
            );
        } catch(error) {
            // console.log(error);
            next(error);
        }
    }
);

router.patch('/',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(patchUserSchema, 'body'),
    async (request:Request, response:Response, next:NextFunction) => {
        const {id: userId} = request.user as any;
        try {
            response.json(
                await userService.patch(userId, request.body)
            );
        } catch(error) {
            next(error);
        }
    }
);

router.delete('/',
    passport.authenticate('jwt', {session: false}),
    async (request:Request, response:Response, next:NextFunction) => {
        const {id: userId} = request.user as any;
        try {
            response.json({
                message: 'Deleted succesfully',
                user: await userService.delete(userId)
            });
        } catch(error) {
            next(error);
        }
    }
);




export default router;