import dotenv from 'dotenv';

dotenv.config();

//Helper to ensure required env variables exist
const required = (key) => {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return process.env[key];
};

const env = {

    PORT: process.env.PORT || 5000,

    MONGODB_URI: required('MONGODB_URI'),

    JWT_SECRET: required('JWT_SECRET'),
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',

    API_KEY: required('API_KEY'),

};

export default env;
