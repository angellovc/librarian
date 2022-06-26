import express, {Request, Response, NextFunction} from 'express';
import FriendService from '../services/friendService';
import FriendshipRequestService from '../services/friendshipRequestService';

const router = express.Router();
const friendService = new FriendService();
const friendshipRequestService = new FriendshipRequestService();

router.get('/', async (request:Request, response:Response, next:NextFunction) => {
    const {id: userId} = request.user as any;

    try {
        response.json(
            await friendService.getFriends(userId)
        );
    } catch(error) {
        next(error);
    }
});

router.get('/:friendId', async (request:Request, response:Response, next:NextFunction) => {
    const {id: userId} = request.user as any;
    const {friendId} = request.params;
    try {
        response.json(
            await friendService.getFriend(userId, parseInt(friendId))
        );
    } catch(error) {
        next(error);
    }
});

router.delete('/:friendId', async (request:Request, response:Response, next:NextFunction) => {
    const {id: userId} = request.user as any;
    const {friendId} = request.params;
    try {
        response.json(
            await friendService.delete(userId, parseInt(friendId))
        );
    } catch(error){
        next(error);
    }
});

export default router;