// Importing modules 

import UserDao from "../../../shared/dao/user.dao.js";
import SessionDao from "../../../shared/dao/session.dao.js";
import TokenDao from "../../../shared/dao/token.dao.js";

import { COOKIE_EXPIRY_TIME, REFRESH_TOKEN_COOKIE_OPTIONS, OTP_EXPIRY_TIME, RESET_PASSWORD_TOKEN_EXPIRY_TIME } from "../../../shared/constants/tokens.constants.js";

import { generateAccessToken, generateOTPToken, generateRefreshToken, generateResetPasswordToken } from "../../../shared/utils/token.util.js";
import sendMail from "../../../shared/utils/sendMail.util.js";
import { getGoogleAuthorizationUrl, getGoogleUserFromCode, verifyGoogleToken } from "../../../shared/utils/googleAuth.util.js";
import crypto from "crypto";
import createSession from "../../../shared/utils/createSession.util.js";

import sanitizeUser from "../../../shared/sanitizers/user.sanitizer.js";

import Created from "../../../shared/responses/Created.response.js";

import Unauthorized from "../../../shared/errors/Unauthorized.error.js";
import BadRequest from "../../../shared/errors/BadRequest.error.js";
import NotFound from "../../../shared/errors/NotFound.error.js";
import Conflict from "../../../shared/errors/Conflict.error.js";
import Ok from "../../../shared/responses/Ok.response.js";

import env from "../../../shared/config/env.config.js";

// clas to handle authentication operations
class AuthController {

    constructor() {

        // initializing the user dao
        this.userDao = new UserDao();

        // initializing the session dao
        this.sessionDao = new SessionDao();

        // initializing the token dao
        this.tokenDao = new TokenDao();

    }

    signup = async (req, res) => {

        // getting the user from the request body
        const { name, email, password } = req.body;

        // creating a new user using the user dao
        const user = await this.userDao.createUser({
            name,
            email,
            password,
            providers: ["local"]
        });

        // creating session and tokens
        const { sanitizedUser, accessToken } = await createSession(user, res, this.sessionDao);

        // generate the otp to verify the user email
        const otp = generateOTPToken();

        // setting otp in the database using the token dao
        await this.tokenDao.createToken({
            email: user.email,
            type: "otp",
            value: otp,
            expiresAt: new Date(Date.now() + OTP_EXPIRY_TIME)
        });

        sendMail(user.email, "Verify your email", `Your OTP is ${otp}. It will expire in ${OTP_EXPIRY_TIME / 60000} minutes.`);

        // seding response with access token
        return Created(res, "Otp Sent Successfully for verification", { user: sanitizedUser, accessToken: accessToken });

    }

}

export default AuthController;
