// Importing modules 
import mongoose from "mongoose";

import { COOKIE_EXPIRY_TIME, REFRESH_TOKEN_COOKIE_OPTIONS } from "../constants/tokens.constants.js";
import { generateAccessToken, generateRefreshToken } from "./token.util.js";
import sanitizeUser from "../sanitizers/user.sanitizer.js";

// function to create a session and return sanitized user with tokens
async function createSession(user, res, sessionDao) {

    // creating a session id
    const sessionId = new mongoose.Types.ObjectId();

    // Making a refresh token using the session id and the user id
    const refreshToken = generateRefreshToken({
        sessionId: sessionId.toString(),
        userId: user._id.toString()
    });

    // creating a new session using the session dao
    await sessionDao.createSession({
        _id: sessionId,
        userId: user._id,
        refreshToken: refreshToken,
        expiresAt: new Date(Date.now() + COOKIE_EXPIRY_TIME)
    });

    // sanitizing the user data to remove sensitive information
    const sanitizedUser = sanitizeUser(user);

    // Making an access token using the user id
    const accessToken = generateAccessToken(sanitizedUser);

    // setting refresh token in the cookie
    res.cookie("refreshToken", refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

    return { sanitizedUser, accessToken };

}

export default createSession;
