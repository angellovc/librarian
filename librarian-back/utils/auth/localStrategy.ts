import boom from '@hapi/boom';
import bcrypt from 'bcryptjs';
import {Strategy} from 'passport-local';
import User from '../../models/user';
import UserService from '../../services/userService';

const userService = new UserService();

const LocalStrategy = new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email:string, password:string, done) => {
        try {
            const user:User = await userService.getByEmail(email.toLowerCase());
            const userPassword = user.password? user.password : ''
            const isMatch = await bcrypt.compare(password, userPassword);
            if (!isMatch) {
                done(boom.unauthorized("Incorrect Credentials"), false);
            } else {
                delete user.password;
                done(null, user);
            }
        } catch (error:any) {
            if (error.isBoom === true)
                done(null,false);
            else
                done(boom.badRequest(error.message), false)
        }
  }
);

export default LocalStrategy;