import Joi from 'joi';

const bookId = Joi.number().greater(-1);
const postId = Joi.number().greater(-1);
const picture = Joi.string();
const title = Joi.string();
const author = Joi.string();
const status = Joi.string();
const currentPage = Joi.number().greater(-1);
const description = Joi.string();

const postBookSchema = Joi.object({
    picture,
    title: title.required(),
    author: author.required(),
    status,
    description: description.allow(""),
    currentPage
});

const updateBookSchema = Joi.object({
    picture: picture.required(),
    title: title.required(),
    author: author.required(),
    status: status.required(),
    currentPage: currentPage.required(),
    description: description.required(),
});

const patchBookSchema = Joi.object({
    picture,
    title: title,
    author,
    status,
    currentPage,
    description
});

const paramsBookSchema = Joi.object({
    bookId,
    postId
});

export {
    postBookSchema,
    updateBookSchema,
    patchBookSchema,
    paramsBookSchema
};