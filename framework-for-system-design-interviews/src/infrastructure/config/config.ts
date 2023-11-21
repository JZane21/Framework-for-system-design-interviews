import dotenv from 'dotenv';
dotenv.config();

export const env = {
    port: process.env.ENV_PORT || 3000,
    environment: process.env.ENV || 'develop'
};

export const db = {
    port: process.env.BD_PORT || 3306,
    type: process.env.BD_TYPE || 'mysql',
    username: process.env.BD_USER || 'root',
    password: process.env.BD_PASS || 'root',
    host: process.env.BD_HOST || 'localhost',
    database: process.env.BD_NAME || 'system_interview_db',
}

export const lg = {
    level: process.env.LG_LEVEL || 'debug'
}

export const jwt = {
    secretKey: process.env.JWT_SECRET || 'your_secret_key',
    expirationTime: process.env.JWT_TIME_EXPIRED || '60s'
}

export const redis = {
    url: process.env.REDIWS_URL || "redis://default:Kks9MOeCTS7NrHDumOy0GjmrnWQWg8tt@redis-11830.c253.us-central1-1.gce.cloud.redislabs.com:11830"

}
