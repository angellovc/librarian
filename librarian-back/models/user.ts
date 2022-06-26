import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import Book from "./book";
import Friend from "./friend";
import FriendshipRequest from "./friendshipRequest";
import Post from './post';

@Entity({name: 'users'})
class User {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: true})
    picture:string;
    @Column()
    name: string;
    @Column({nullable: true})
    description:string;
    @Column({select: false, nullable: false})
    password?: string;
    @Column({
        type: 'varchar',
        length: 500,
        unique: true,
    })
    email: string;
    @OneToMany(type => Book, books => books.userId, {cascade: true})
    books: Relation<Book[]>
    @OneToMany(type => Post, post => post.user, {cascade: true})
    posts: Relation<Post[]>
    @OneToMany(type => FriendshipRequest, friendshipRequest => friendshipRequest.friend)
    friendRequests: FriendshipRequest[]
    @OneToMany(type => Friend, friend => friend.friend, {cascade: ['remove']})
    friends: Relation<Friend[]>;

    constructor(name:any, email:any, password:any, picture:string, description:string, id:any = undefined) {
        if (id !== undefined)
            this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        if(picture !== undefined)
            this.picture = picture;
        if(description !== undefined)
            this.description = description;
    }
    
}

export default User;