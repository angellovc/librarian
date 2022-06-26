import boom from "@hapi/boom";
import { Connection, getConnection, getRepository, Repository } from "typeorm";
import { addSyntheticLeadingComment } from "typescript";
import Friend from "../models/friend";
import User from "../models/user";


class FriendService {
    database:Connection;
    friendRepository:Repository<Friend>;

    constructor() {
        this.database = getConnection('librarian');
        this.friendRepository = this.database.getRepository(Friend);
    }

    async getFriends(userId:number) {
        const friends:Friend[] = await this.friendRepository.find({where: {userId}, relations: ['friend']});
        friends.forEach(friend => delete friend.id);
        return friends;
    }

    async getFriend(userId:number, friendId:number) {
        const friend:Friend|undefined = await this.friendRepository.findOne({where: {userId, friendId}, relations: ['friend']});
        if (friend === undefined)
            throw boom.notFound('Friend was not found');
        return friend;
    }

    async addFriend(userId:number, friendId:number) {
        await this.friendRepository.save(
            new Friend(userId, friendId)
        );
        await this.friendRepository.save(
            new Friend(friendId, userId)
        );
    }

    async delete(userId:number, friendId:number) {
        let friendship:Friend = await this.getFriend(friendId, userId);
        this.friendRepository.remove(friendship);
        friendship = await this.getFriend(userId, friendId);
        return await this.friendRepository.remove(friendship);
    }

    async areFriends(userId:number, friendId:number) {
        try {
            await this.getFriend(userId, friendId);
            return true;
        } catch {
            return false;
        }
    }

}

export default FriendService;