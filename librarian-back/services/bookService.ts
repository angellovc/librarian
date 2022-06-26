import boom from "@hapi/boom";
import { Connection, getConnection, Repository } from "typeorm"
import Book from '../models/book';

class BookService {
    database:Connection;
    bookRepository:Repository<Book>

    constructor() {
        this.database = getConnection('librarian');
        this.bookRepository = this.database.getRepository(Book);
    }

    async getAll(userId:number) {
        return await this.bookRepository.find({where: {userId}, order: {creationDate: 'DESC'}});
    }

    async get(userId:number, bookId:number) {
        const book = await this.bookRepository.createQueryBuilder("books")
            .where("books.user_id = :userId", {userId})
            .where("books.id = :bookId", {bookId})
            .addSelect('books.userId')
            .getOne();

        if (book === undefined) 
            throw boom.notFound('Book was not found');

        if (book.userId !== userId) 
            throw boom.unauthorized('Content restricted to the user')
        delete book.userId;
        return book;
    }

    async create(userId:number, data:any) {
        const {picture, title, author, status, currentPage, description} = data;
        const book = await this.bookRepository.save(
            new Book({
                picture,
                title,
                author,
                status: status === undefined? 'new': status,
                currentPage: isNaN(parseInt(currentPage)) ? 0: parseInt(currentPage),
                description,
                userId
            }
            )
        );
        await delete book.userId;
        return book;
    }

    async update(userId:number, bookId:number, data:any) {
        const {picture, title, author, status, currentPage, description} = data;
        const book = await this.get(userId, bookId);
        book.picture = picture;
        book.title = title;
        book.author = author;
        book.status = status === undefined? 'new': status;
        book.description = description;
        book.currentPage = isNaN(parseInt(currentPage)) ? 0: parseInt(currentPage);
        const updatedBook = await this.bookRepository.save(book);
        return updatedBook;
    }

    async patch(userId:number, bookId:number, data:any) {
        const {description, picture, title, author, status, currentPage} = data;
        const book = await this.get(userId, bookId);
        const keys = Object.keys(data);
        
        if (keys.includes('description'))
            book.description = description;
        if (keys.includes('picture'))
            book.picture = picture;
        if (keys.includes('title'))
            book.title = title;
        if (keys.includes('author'))
            book.author = author;
        if (keys.includes('status'))
            book.status = status;
        if (keys.includes('currentPage'))
            book.currentPage = Number(currentPage);

        const updatedBook = await this.bookRepository.save(book);
        return updatedBook;
    }
    //TODO: change the method
    // expected result: change the active for false instead of deleting the book
    async delete(userId:number, bookId:number) {
        const book:Book = await this.get(userId, bookId);
        this.bookRepository.remove(book);
        return book;
    }
}

export default BookService;