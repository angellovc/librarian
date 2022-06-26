import Joi from 'joi';

const userId = Joi.number().integer().greater(-1);
const name = Joi.string().min(3).max(250);
const description = Joi.string().min(0).max(200);
const email = Joi.string().email();
const password = Joi.string().min(6);
const picture = Joi.string().min(6);

const updateCreateUserSchema = Joi.object({
    email: email.required(),
    description,
    name: name.required(),
    password: password.required(),
    picture
});

const patchUserSchema = Joi.object({
    email,
    name,
    description,
    password,
    picture
});

const paramUserSchema = Joi.object({
    userId
});

export {
    updateCreateUserSchema,
    patchUserSchema,
    paramUserSchema
}