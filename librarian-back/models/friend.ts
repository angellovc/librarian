import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation, Unique } from "typeorm";
import User from "./user";

@Unique(['userId', 'friendId'])
@Entity({name: 'friends'})
class Friend {

    @PrimaryGeneratedColumn()
    id?:number;
    @Column({name: 'user_id', select: false})
    userId:number;
    @Column({name: 'friend_id', select: false})
    friendId:number;
    @ManyToOne(type => User, user => user.friends, {onDelete: 'CASCADE', nullable: false})
    @JoinColumn({name: 'user_id'})
    user: Relation<User>;
    @ManyToOne(type => User, user => user.friends, {onDelete: 'CASCADE', nullable: false})
    @JoinColumn({name: 'friend_id'})
    friend: Relation<User>;
    @CreateDateColumn({name: 'creation_date'})
    creationDate:Date;

    constructor(userId:number, friendId:number) {
        this.userId = userId;
        this.friendId = friendId;
    }
}


export default Friend;