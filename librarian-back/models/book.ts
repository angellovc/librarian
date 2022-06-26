import {Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation} from 'typeorm'; 
import Post from './post';
import User from './user';
import { BookStatus } from '../data/enums';

interface BookParameters{
    author:string,
    title:string,
    userId:number,
    status?:BookStatus,
    currentPage?: number,
    picture?:string,
    description?:string,
    id?:number
}

@Entity({name: 'books'})
class Book {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({default: 'assets/images/static/book-cover.jpg'})
    picture:string;
    @Column()
    title: string;
    @Column()
    author: string;
    @Column({default: ''})
    description:string;
    @Column({default: BookStatus.new, type: 'enum', enum: BookStatus})
    status: BookStatus|undefined;
    @Column({name: 'current_page', default: 0})
    currentPage: number;
    @CreateDateColumn({name: 'creation_date'})
    creationDate: number
    @Column({name:'user_id', select: false})
    userId?:number
    @ManyToOne(type => User, user => user.books, {onDelete: 'CASCADE', nullable: false})
    @JoinColumn({name: 'user_id'})
    user: Relation<User>;
    @OneToMany(type => Post, post => post.book, {cascade: true})
    posts: Relation<Post[]>


    constructor(data:BookParameters) {
        if (data !== undefined) {
            const {author, title, status, currentPage, description, picture, userId, id} = data;
            if (id !== undefined)
                this.id = id;
            if (description !== undefined)
                this.description = description;
            if (currentPage !== undefined)
                this.currentPage = currentPage;
            if (picture !== undefined && picture !== '')
                this.picture = picture;
            this.title = title;
            this.author = author;
            this.status = status;
            this.userId = userId;
        }
    }
}

export default Book;