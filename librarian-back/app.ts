import "reflect-metadata" ;
import {createConnection} from 'typeorm';
import express from 'express';

import {DATABASE_NAME, DATABASE_USER, DATABASE_USER_PASSWORD, PORT, EMAIL, EMAIL_SECRET} from './data/config';
import User from "./models/user";

import { boomErrorHandler, errorHandler, ormErrorHandler } from "./middlewares/errorHandlers";
import Book from "./models/book";
import Post from "./models/post";

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import FriendshipRequest from "./models/friendshipRequest";
import Mailer from "./utils/mails/mailer";
import Friend from "./models/friend";
import cors from 'cors';

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: 'Librarian API',
            version: '1.0.0',
            decription: 'A simple Library API to store books you have'
        },
    },
    apis: ["./routes/*.ts"]
}

const url = `postgres://${DATABASE_USER}:${DATABASE_USER_PASSWORD}@localhost:5432/${DATABASE_NAME}`;
Mailer.instanciate("smtp.gmail.com", EMAIL+"", EMAIL_SECRET+"", true);


createConnection({
    name: "librarian",
    type: "postgres",
    url,
    entities: [User, Book, Post, FriendshipRequest, Friend],
    synchronize: true,
    logging: false
}).then(async connection => {
    const {default: router} = await import('./routes/router');
    const {default: auth} = await import('./utils/auth/auth'); 
    const app = express();

    app.use(cors({
        origin: "*"
    }));
    app.use(express.json());

    /* Swagger */
    const specs = swaggerJsDoc(swaggerOptions);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

    app.get('/', (request, response) => {
        response.send('Server running');
    });

    app.use(auth.initialize());
    router(app);


    /* Error Middlewares */
    app.use(boomErrorHandler);
    app.use(ormErrorHandler);
    app.use(errorHandler);


    app.listen(PORT, () => {
        console.log(`Server running at port: ${PORT}`);
    });
}).catch(console.log);


