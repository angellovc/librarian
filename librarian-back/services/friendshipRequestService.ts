import boom from "@hapi/boom";
import { Connection, getConnection, Repository } from "typeorm";
import FriendshipRequest from "../models/friendshipRequest";
import { Friendship } from "../data/enums";

class FriendshipRequestService {

    database:Connection;
    friendRespository:Repository<FriendshipRequest>;

    constructor() {
        this.database = getConnection('librarian');
        this.friendRespository = this.database.getRepository(FriendshipRequest);
    }

    async getSentRequests(userId:number) {
        const sentRequests:FriendshipRequest[] = await this.friendRespository.find({where: {userId, friendship: Friendship.pending}, relations: ['friend']});
        return sentRequests;
    }

    async getSentRequest(userId:number, friendRquestId:number) {
        const sentRequest:FriendshipRequest|undefined = await this.friendRespository.findOne({where: {userId, id: friendRquestId}, relations: ['friend']});
        if (sentRequest === undefined)
            throw boom.notFound("Friendship request doesn't exist");
        return sentRequest;
    }

    async getPendingRequests(userId:number) {
        const pendingFriends:FriendshipRequest[] = await this.friendRespository.find({where: {friendId: userId, friendship: Friendship.pending}, relations: ['user']});
        return pendingFriends;
    }

    async getReceivedRequest(userId:number, friendRequestId:number):Promise<FriendshipRequest> {
        const sentRequest:FriendshipRequest|undefined = await this.friendRespository.findOne({where: {friendId: userId, id: friendRequestId}, relations: ['user']});
        if (sentRequest === undefined)
            throw boom.notFound("Friendship request doesn't exist");
        return sentRequest;
    }


    async acceptFriendshipRequest(userId:number, friendRequestId:number) {
        const friend:FriendshipRequest = await this.getReceivedRequest(userId, friendRequestId);
        if (friend.friendship === Friendship.accepted)
            throw boom.conflict("You're already Friends");
        friend.friendship = Friendship.accepted;
        return await this.friendRespository.save(friend);
    }

    async removeFriendshipRequest(userId:number, friendRequestId:number) {
        const friendRequest:FriendshipRequest = await this.getReceivedRequest(userId, friendRequestId);
        return await this.friendRespository.remove(friendRequest);
    }


    async createFriendRequest(userId:number, friendId:number) {
        if (userId == friendId) 
            throw boom.conflict('You cannot add yourself as Friend');
        const friendshipRequest:FriendshipRequest|undefined = await this.friendRespository.findOne({where: {friendId: userId, userId: friendId}});
        
        if (friendshipRequest === undefined) {
            await this.friendRespository.save(
                new FriendshipRequest(userId, friendId)
            );

            return await this.friendRespository.findOne({where: {friendId: userId, userId: friendId}, relations: ['user']});
        }
        if ( friendshipRequest.friendship === Friendship.pending)
            throw boom.conflict('You already have a friendship request from that user');
    }


}

export default FriendshipRequestService;