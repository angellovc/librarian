import dotenv from 'dotenv';

dotenv.config()

const {
    PORT,
    DATABASE_USER,
    DATABASE_NAME,
    DATABASE_USER_PASSWORD,
    JWT_SECRET,
    JWT_RECOVERY_SECRET,
    EMAIL,
    EMAIL_SECRET,
    FRONTEND_APP
} = process.env;


export {
    PORT,
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_USER_PASSWORD,
    JWT_SECRET,
    JWT_RECOVERY_SECRET,
    EMAIL,
    EMAIL_SECRET,
    FRONTEND_APP
};