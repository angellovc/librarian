import express, { Router, Request, Response, NextFunction } from 'express';
import path from 'path';
import { picturesFolder, uploadImage } from '../middlewares/uploadHandlers';
import fs from 'fs';
import passport from 'passport';

const router:Router = express.Router();
const picturesPath = __dirname+'../../../'+picturesFolder;
const staticPath = __dirname+'../../../assets/static/';

router.get('/images/:filename', async (request:Request, response:Response, next:NextFunction) => {
    const { filename } = request.params;
    response.sendFile(path.join(picturesPath, filename));
});

router.get('/images/static/:filename', async (request:Request, response:Response, next:NextFunction) => {
    const { filename } = request.params;
    response.sendFile(path.join(staticPath+'pictures/', filename));
});

router.delete('/images/:filename', 
    passport.authenticate('jwt', {session: false}),
    async (request:Request, response:Response, next:NextFunction) => {
        const {filename} = request.params;
        try {
            fs.unlinkSync(path.join(picturesPath, filename));
            response.json({
                message: 'File deleted successfully'
            });
        } catch(error) {
            response.status(404).json({message: `File '${filename}' was not found`});
        }
    }
);

router.post('/images',
    uploadImage.single('image'),
    async (request:Request, response:Response, next:NextFunction) => {
        response.json({
            filepath: request.file?.path,
            filename: request.file?.filename,
        });
    }
);

export default router;