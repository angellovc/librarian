import User from "../models/user";
import { Connection, Repository, getConnection } from "typeorm";
import boom from "@hapi/boom";
import bcrypt from 'bcryptjs';

class UserService {

    database:Connection;
    userRepository: Repository<User>

    constructor() {
        this.database = getConnection('librarian');
        this.userRepository = this.database.getRepository(User);
    }

    async getAll() {
        return await this.userRepository.find();
    }

    async get(id:string|number, books:boolean = false) {

        const user = books? 
            await this.userRepository.createQueryBuilder("users")
                .where("users.id = :id", {id})
                .leftJoinAndSelect("users.books", "books")
                .where("books.active = true").getOne() :
            await this.userRepository.findOne(id);

        if (user === undefined) {
            throw boom.notFound('User was not found');
        }
        return user;
    }

    async getByEmail(email:string, books:boolean = false):Promise<User> {
        const user = books?
            await this.userRepository.createQueryBuilder("users")
                .where("users.email = :email", {email})
                .leftJoinAndSelect("users.books", "books")
                .addSelect('passowrd')
                .where("books.active = true").getOne() :
            await this.userRepository.createQueryBuilder("users")
                .addSelect("users.password")
                .where("books.active = true")
                .where("users.email = :email", {email}).getOne();

        if (user === undefined) {
            throw boom.notFound("There's no user with that email");
        }
        return user;
    }

    async create(data:any) {
        const {name, description, email, password, picture} = data;
        const user:User = new User(name, email, await this.encrypt(password), picture, description);
        const response = await this.userRepository.save(user);
        delete response.password;
        return response;
    }

    async update(id:string, data:any) {
        const user = await this.get(id);
        if (user.email === data.email) {
            delete data.email;
        }
        await this.userRepository.update(id, {...data, password: await this.encrypt(data.password), id});
        return await this.get(id);
    }

    async patch(id:string|number, data:any) {
        const user:User = await this.get(id);
        const keys = Object.keys(data)
        if (keys.includes('email'))
            user.email = data.email;
        if (keys.includes('name'))
            user.name = data.name;
        if (keys.includes('description'))
            user.description = data.description;
        if (keys.includes('picture'))
            user.picture = data.picture;
        if (keys.includes('password'))
            user.password = await this.encrypt(data.password);
        
        const response = await this.userRepository.save(user);
        delete response.password;
        return response;
    }

    async delete(id:string|number) {
        const user:User = await this.get(id);
        const response = await this.userRepository.remove(user);
        delete response.password;
        return response;
    }

    async encrypt(str:string) {
        return await bcrypt.hash(str,10);
    }

    async userExists(userId:number) {
        try {
            await this.get(userId);
            return true;
        } catch {
            return false;
        }
    }

}

export default UserService;