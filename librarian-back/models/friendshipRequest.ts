import {Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, PrimaryColumn, Unique} from 'typeorm'; 
import User from './user';
import {Friendship} from '../data/enums';


@Unique(['userId', 'friendId'])
@Entity({name: 'friendship_requests'})
class FriendshipRequest {
    @PrimaryGeneratedColumn()
    id:number
    @Column({name: 'user_id', select: false})
    userId?:number;
    @Column({name: 'friend_id', select: false})
    friendId?:number;
    @ManyToOne(type => User, user => user.id, {cascade: true})
    @JoinColumn({name: 'user_id'})
    user:User
    @ManyToOne(type => User, user => user.id, {cascade: true})
    @JoinColumn({name: 'friend_id'})
    friend:User
    @Column({default: Friendship.pending, type: 'enum', enum: Friendship})
    friendship:Friendship
    @CreateDateColumn()
    creationDate: Date;
    @UpdateDateColumn()
    updatingDate: Date;


    constructor(userId:number, friendId:number) {
        this.userId = userId;
        this.friendId = friendId;
    }
}

export default FriendshipRequest;