import express, { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {JWT_SECRET, JWT_RECOVERY_SECRET} from '../data/config';
import Mailer from '../utils/mails/mailer';
import UserService from '../services/userService';
import User from '../models/user';
import { recoveryPassword } from '../utils/mails/recoveryPasswordTemplate';
import boom from '@hapi/boom';

const router:Router = express.Router();
const mailer:Mailer = Mailer.getInstance();    
const userService:UserService = new UserService();

router.post('/login', 
    passport.authenticate('local', {session: false}),
    async (request:Request, response:Response, next:NextFunction) => {
        try {
            const user:any = request.user;
            const payload = {
                id: user?.id,
            }
            const token = jwt.sign(payload, JWT_SECRET as string, {expiresIn: '2h'})
            response.json({user, token});
        } catch(error) {
            next(error);
        }
    }
);

router.get('/token-refresh',
    async (request:Request, response:Response, next:NextFunction) => {
        try {
            const authorization:string = request.headers?.authorization as string;
            const payload = jwt.decode(authorization.replace("Bearer ", ''), {json: true});
            if (payload?.id === undefined)
                throw boom.badRequest('Baddly formated token')
            const id:string = payload?.id as string;
            const user = await userService.get(id)
            const token = jwt.sign({id: user.id}, JWT_SECRET as string, {expiresIn: '2h'})
            response.json({user, token});
        } catch(error) {
            next(error);
        }
    });

router.post('/recovery', async (request:Request, response:Response, next:NextFunction) => {
    const {email} = request.body;
    try {
        const user:User = await userService.getByEmail(email);
        const payload = {
            id: user.id,
            email: user.email,
            recovery: true
        }
        const token = jwt.sign(payload, JWT_RECOVERY_SECRET as string, {expiresIn: 60*15});
        await mailer.send(recoveryPassword(email, "Recovery password", token));
        response.json({
            message: `Recovery Email was sent to ${email}`
        });
    } catch(error) {
        next(error);
    }
});

router.post('/change-password', async (request:Request, response:Response, next:NextFunction) => {
    const {token, newPassword} = request.body;
    try {
        const payload = jwt.verify(token, JWT_RECOVERY_SECRET as string) as {id:string, email:string,recovery:boolean};
        await userService.patch(payload.id, {password: newPassword});
        response.json({
            message: 'Password was updated'
        })
    } catch(error) {
        next(error);
    }
});


export default router;