// Importing modules
import jwt from "jsonwebtoken";
import env from "../config/env.config.js";
import { EXPIRY } from "../constants/tokens.constants.js";

// function to generate access token
function generateAccessToken(payload) {
    return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, { expiresIn: EXPIRY.ACCESS_TOKEN });
}

// function to generate refresh token
function generateRefreshToken(payload) {
    return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, { expiresIn: EXPIRY.REFRESH_TOKEN });
}

function generateOTPToken(length = 6) {

    // calculating the minimum value for the random number based on the length
    const min = Math.pow(10, length - 1);

    // calculating the maximum value for the random number based on the length
    const max = Math.pow(10, length) - 1;

    // generating a random number between the minimum and maximum values
    const otp = Math.floor(Math.random() * (max - min) + min);

    return otp;

}

function generateResetPasswordToken(length = 32) {

    // Characters to be used in the token
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';

    // Generating a random token of the specified length
    let token = '';

    for (let i = 0; i < length; i++) {

        // choosing a random character from the characters string and appending it to the token
        token += characters.charAt(Math.floor(Math.random() * characters.length));

    }

    return token;

}

export { generateAccessToken, generateRefreshToken, generateOTPToken, generateResetPasswordToken };