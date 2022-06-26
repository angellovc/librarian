import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn} from 'typeorm';
import Book from './book';
import User from './user';

@Entity({name: 'posts'})
class Post {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'text'})
    content: string
    @CreateDateColumn({name: 'creation_date'})
    creationDate: Date;
    @UpdateDateColumn()
    updatingDate: Date;
    @Column({name: 'user_id', select: false})
    userId?:number;
    @ManyToOne(type => User, user => user.posts, {onDelete: 'CASCADE', nullable: false})
    @JoinColumn({name: 'user_id'})
    user:Relation<User>;
    @Column({name: 'book_id', select: false})
    bookId?:number;
    @ManyToOne(type => Book, book => book.posts, {onDelete: 'CASCADE', nullable: false})
    @JoinColumn({name: 'book_id'})
    book: Relation<Book>;

    constructor(userId:number, bookId:number, content:string, id:number|undefined = undefined) {
        this.userId = userId;
        this.bookId = bookId;
        this.content = content;
        if (id !== undefined)
            this.id = id
    }

}

export default Post;