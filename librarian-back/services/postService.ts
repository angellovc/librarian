import { Connection, Repository, getConnection } from "typeorm";
import Post from "../models/post";
import boom from '@hapi/boom';
import Book from "../models/book";

class PostService {
    database:Connection;
    postRespository:Repository<Post>;
    bookRespository:Repository<Book>;

    constructor() {
        this.database = getConnection('librarian');
        this.postRespository = this.database.getRepository(Post);
        this.bookRespository = this.database.getRepository(Book);
    }

    async getAll(userId:number, bookId:number):Promise<Post[]> {
        return await this.postRespository.find({where: {bookId: bookId, userId: userId}, relations: ['user'], order: {creationDate: 'DESC'}});
    }

    async get(userId:number, bookId:number, postId:number):Promise<Post> {
        const post = await this.postRespository.findOne({where: {id: postId, bookId: bookId, userId: userId}, relations: ['user']});
        if (post === null || post=== undefined)
            throw boom.notFound('Post was not found');

        if (post.user.id !== userId)
            throw boom.unauthorized('Content restricted to the user');

        await delete post.userId;
        return post;
    }

    async create(userId:number, bookId:number, data:any):Promise<Post> {
        if(!await this.userHasBookAccess(userId, bookId))
            throw boom.unauthorized('Content restricted to the user');

        const post = new Post(userId, bookId, data.content);
        const newPost = await this.postRespository.save(post);
        return await this.get(userId, bookId, newPost.id); 
    }

    async update(userId:number, bookId:number, postId:number, data:any):Promise<Post> {
        const {content} = data;
        const post = await this.get(userId, bookId, postId);
        post.content = content;
        await this.postRespository.save(post);
        return await this.get(userId, bookId, postId);
    }

    async delete(userId:number, bookId:number, postId:number):Promise<Post> {
        const post:Post = await this.get(userId, bookId, postId);
        const returned = {...post};
        await this.postRespository.remove(post);
        return returned; 
    }

    async userHasBookAccess(userId:number, bookId:number) {
        const book = await this.bookRespository.createQueryBuilder('books')
            .where('books.id = :bookId', {bookId})
            .addSelect('books.userId')
            .getOne();
        if (book === null || book === undefined)
            throw boom.notFound('Book was not found');
        if (book.userId !== userId)
            return false;
        return true;
    }

}

export default PostService;