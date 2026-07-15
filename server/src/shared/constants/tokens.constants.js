// Importing modules
import env from "../config/env.config.js";

export const EXPIRY = {

    ACCESS_TOKEN: env.NODE_ENV == "development" ? "5m" : "15m",
    REFRESH_TOKEN: env.NODE_ENV == "development" ? "2h" : "7d",

}

export const COOKIE_EXPIRY_TIME = env.NODE_ENV == "development" ? 2 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000; // 2 hours or 7 days

export const REFRESH_TOKEN_COOKIE_OPTIONS = {

    httpOnly: true,
    secure: env.NODE_ENV == "production" ? true : false,
    sameSite: env.NODE_ENV == "production" ? "none" : "lax",
    maxAge: COOKIE_EXPIRY_TIME,

}

export const OTP_EXPIRY_TIME = env.NODE_ENV == "development" ? 5 * 60 * 1000 : 10 * 60 * 1000; // 5 minutes in development and 10 minutes in production

export const RESET_PASSWORD_TOKEN_EXPIRY_TIME = env.NODE_ENV == "development" ? 5 * 60 * 1000 : 10 * 60 * 1000; // 5 minutes in development and 10 minutes in production