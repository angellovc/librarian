import express, { NextFunction, Request, Response } from 'express';
import { paramsBookSchema, patchBookSchema, postBookSchema, updateBookSchema } from '../middlewares/schemas/bookSchema';
import { validatorHandler } from '../middlewares/validatorHandlers';
import BookService from "../services/bookService";
import PostService from '../services/postService';

const router = express.Router();
const bookService = new BookService();
const postService = new PostService();

 /**
  * @swagger
  * tags:
  *     name: Books
  *     description: The books managing API
  * 
  */

/**
 * @swagger
 *components:
 *  schemas:
 *      Book:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *                  description: auto generated id of the book
 *              title:
 *                  type: string
 *                  description: The title of the book
 *              author:
 *                  type: string
 *                  description: Who wrote the book
 *              status:
 *                  type: string
 *                  description: Book status [finished, in progress, new]
 *              currentPage:
 *                  type: integer
 *                  description: Book page where the user is currently at
 *          example:
 *              id: 234
 *              title: Alex the great
 *              author: anonymous
 *              status: finished
 *              currentPage: 300
 *      
 *      PostBook:
 *          type: object
 *          required:
 *              - title
 *              - author
 *          properties:
 *              title:
 *                  type: string
 *                  description: The title of the book
 *              author:
 *                  type: string
 *                  description: Who wrote the book
 *              status:
 *                  type: string
 *                  description: Book status [finished, in progress, new]
 *              currentPage:
 *                  type: integer
 *                  description: Book page where the user is currently at
 *          example:
 *              title: Alex the great
 *              author: anonymous
 *              status: finished
 *              currentPage: 300
 *      NotFoundBook:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: number
 *                  description: 'Response status'
 *              error:
 *                  type: string
 *                  description: 'The error type'
 *              message:
 *                  type: string
 *          example:
 *              statusCode: 404
 *              error: 'Not Found'
 *              message: 'Book was not found' 
 *      BadRequest:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *              error:
 *                  type: string
 *              message:
 *                  type: string
 *          example:
 *              statusCode: 400
 *              error: 'Bad Rquest'
 *              message: '"Title" is required'  
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  security:
 *      - bearerAuth: []
 *  parameters:
 *      bearerToken:
 *          name: 'Authorization'
 *          in: header
 *          description: Bearer token
 *          type: string
 *          required: true
 *          format: bearer
 *          security:
 *              - bearerAuth: []
 *      book:
 *          in: path
 *          name: bookId
 *          required: true
 *          schema:
 *              type: string
 *          description: 'The id of the book'
 * 
 */

 /**
  * @swagger
  * /books:
  *     get:
  *         summary: Get all the books
  *         security:
  *             - bearerAuth: []
  *         tags: [Books]
  *         responses:
  *             200:
  *                 description: The list of all books the user have
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/Book'
  *             401:
  *                 description: The list of all books the user have
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: string
  *                             description: unauthorized
  *                             example:
  *                                 'Unauthorized' 
  */
router.get('/', async (request:Request, response:Response, next:NextFunction) => {
    const {id: userId} = request.user as any;
    try {
        response.json(
            await bookService.getAll(userId)
        );
    } catch(error) {
        next(error);
    }

});

 /**
  * @swagger
  * /books/{bookId}:
  *     get:
  *         summary: Get a specific Book
  *         security:
  *             - bearerAuth: []
  *         tags: [Books]
  *         parameters:
  *             - $ref: '#/components/parameters/book'
  *         responses:
  *             200:
  *                 description: The requested book
  *                 content:
  *                     application/json:
  *                         schema:
  *                             $ref: '#/components/schemas/Book'
  *             401:
  *                 description: The requested Book
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: string
  *                             description: unauthorized
  *                             example:
  *                                 'Unauthorized'                               
  *             404:
  *                 description: 'The book was not found'
  *                 content:                            
  *                     application/json:
  *                         schema:
  *                             $ref: '#/components/schemas/NotFoundBook'
  */
router.get('/:bookId',
    validatorHandler(paramsBookSchema, 'params'),
    async (request:Request, response:Response, next:NextFunction) => {
        const {id: userId} = request.user as any;
        const {bookId} = request.params;
        try {
            response.json(
                await bookService.get(userId, parseInt(bookId))
            );
        } catch(error) {
            next(error);
        }
    }
);

/**
  * @swagger
  * /books:
  *     post:
  *         summary: Save a new Book
  *         security:
  *             - bearerAuth: []
  *         tags: [Books]
  *         requestBody:
  *             required: true
  *             content:
  *                 application/json:
  *                     schema:
  *                         $ref: '#/components/schemas/PostBook'
  *         responses:
  *             200:
  *                 description: The requested book
  *                 content:
  *                     application/json:
  *                         schema:
  *                             $ref: '#/components/schemas/Book'
  *             401:
  *                 description: The requested Book
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: string
  *                             description: unauthorized
  *                             example:
  *                                 'Unauthorized'                               
  *             400:
  *                 description: 'Bad Request'
  *                 content:                            
  *                     application/json:
  *                         schema:
  *                             $ref: '#/components/schemas/BadRequest'
  */
router.post('/',
    validatorHandler(postBookSchema, 'body'),
    async (request:Request, response:Response, next:NextFunction) => {
        const {id: userId} = request.user as any;
        const data = request.body;
        try {
            response.json(
                await bookService.create(userId, data)
            );
        } catch(error) {
            next(error);
        }
    }
);

router.put('/:bookId',
    validatorHandler(paramsBookSchema,'params'),
    validatorHandler(updateBookSchema, 'body'),
    async (request:Request, response:Response, next:NextFunction) => {
        const {id: userId} = request.user as any;
        const {bookId} = request.params;
        try {
            response.json(
                await bookService.update(userId, parseInt(bookId), request.body)
            );
        } catch(error) {
            next(error);
        }
    }
);

router.patch('/:bookId',
    validatorHandler(paramsBookSchema,'params'),
    validatorHandler(patchBookSchema, 'body'),
    async (request:Request, response:Response, next:NextFunction) => {
        const {id: userId} = request.user as any;
        const {bookId} = request.params;
        try {
            response.json(
                await bookService.patch(userId, parseInt(bookId), request.body)
            );
        } catch(error) {
            next(error);
        }
    }
);

router.delete('/:bookId',
    validatorHandler(paramsBookSchema,'params'),
    async (request:Request, response:Response, next:NextFunction) => {
        const {id: userId} = request.user as any;
        const {bookId} = request.params;
        try {
            response.json(
                await bookService.delete(userId, parseInt(bookId))
            );
        } catch(error) {
            next(error);
        }
});


/* Book Posts */
router.get('/:bookId/posts',
    validatorHandler(paramsBookSchema,'params'),
    async (request:Request, response:Response, next:NextFunction) => {
        const {id: userId} = request.user as any;
        const {bookId} = request.params;
        try {
            response.json(
                await postService.getAll(parseInt(userId), parseInt(bookId))
            );
        } catch(error) {
            next(error);
        }
    }
);

router.get('/:bookId/posts/:postId', 
    validatorHandler(paramsBookSchema,'params'),
    async (request:Request, response:Response, next:NextFunction) => {
        const {id: userId} = request.user as any;
        const {bookId, postId} = request.params;
        try {
            response.json(
                await postService.get(userId, parseInt(bookId), parseInt(postId))
            );
        } catch(error) {
            next(error);
        }
    }
);


router.post('/:bookId/posts',
    validatorHandler(paramsBookSchema,'params'),
    async (request:Request, response:Response, next:NextFunction) => {
        const {id: userId} = request.user as any;
        const {bookId} = request.params;
        try {
            response.json(
                await postService.create(userId, parseInt(bookId), request.body)
            );
        } catch(error) {
            next(error);
        }
    }
);

router.put('/:bookId/posts/:postId', 
    validatorHandler(paramsBookSchema,'params'),
    async (request:Request, response:Response, next:NextFunction) => {
        const {id: userId} = request.user as any;
        const {bookId, postId} = request.params;
        const data = request.body;
        try {
            response.json(
                await postService.update(userId, parseInt(bookId), parseInt(postId), data)
            );
        } catch(error) {
            next(error);
        }
    }
);

router.patch('/:bookId/posts/:postId',
    validatorHandler(paramsBookSchema,'params'),
    async (request:Request, response:Response, next:NextFunction) => {
        const {id: userId} = request.user as any;
        const {bookId, postId} = request.params;
        const data = request.body;
        try {
            response.json(
                await postService.update(userId, parseInt(bookId), parseInt(postId), data)
            );
        } catch(error) {
            next(error);
        }
    }
);

router.delete('/:bookId/posts/:postId', 
    validatorHandler(paramsBookSchema,'params'),
    async (request:Request, response:Response, next:NextFunction) => {
        const {id: userId} = request.user as any;
        const {bookId, postId} = request.params;
        try {
            response.json(
                await postService.delete(userId, parseInt(bookId), parseInt(postId))
            );
        } catch(error) {
            next(error);
        } 
    }
);

export default router;