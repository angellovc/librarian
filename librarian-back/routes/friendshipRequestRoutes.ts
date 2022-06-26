import boom from '@hapi/boom';
import express, { NextFunction, Request, Response } from 'express';
import FriendService from '../services/friendService';
import FriendshipRequestService from '../services/friendshipRequestService';
import UserService from '../services/userService';

const router = express.Router();
const userService = new UserService();
const friendshipRequestService = new FriendshipRequestService();
const friendService = new FriendService();

router.get('/pending', async (request:Request, response:Response, next:NextFunction) => {
    const {id: userId} = request.user as any;
    try {
        response.json(
            await friendshipRequestService.getPendingRequests(userId)
        );
    } catch(error) {
        next(error);
    }
});

router.get('/sent', async (request:Request, response:Response, next:NextFunction) => {
    const {id: userId} = request.user as any;
    try {
        response.json(
            await friendshipRequestService.getSentRequests(userId)
        );
    } catch(error) {
        next(error);
    }
});


router.post('/:friendId', async (request:Request, response:Response, next:NextFunction) => {
    const {id: userId} = request.user as any;
    const {friendId} = request.params;
    try {
        if(await userService.userExists(userId) === false)
            throw boom.notFound('User was not found');
        if (await friendService.areFriends(userId, parseInt(friendId)) === true)
            throw boom.conflict('You are already Friends');
        response.json(
            await friendshipRequestService.createFriendRequest(userId, parseInt(friendId))
        )
    } catch(error) {
        next(error);
    }
});

router.put('/:friendRequestId/accept', async (request:Request, response:Response, next:NextFunction) => {
    const {id: userId} = request.user as any;
    const {friendRequestId} = request.params;
    try {
        const friendshiptRequest = await friendshipRequestService.removeFriendshipRequest(userId, parseInt(friendRequestId));
        friendService.addFriend(userId, friendshiptRequest.user.id as number);
        response.json(
            friendshiptRequest
        );
    } catch(error) {
        next(error);
    }
});


router.delete('/:friendRequestId', async (request:Request, response:Response, next:NextFunction) => {
    const {id: userId} = request.user as any;
    const {friendRequestId} = request.params;
    try {
        response.json(
            await friendshipRequestService.removeFriendshipRequest(userId, parseInt(friendRequestId))
        );
    } catch(error) {
        next(error);
    }
});



export default router;
