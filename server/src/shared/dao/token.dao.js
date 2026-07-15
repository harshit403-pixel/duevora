// Importing modules
import Token from '../models/token.model.js';

// class for the Token Data Access Object (DAO)
class TokenDAO {

    // constructor for the TokenDAO class
    constructor() {

        this.tokenModel = Token;

    }

    // method to create a new token
    async createToken(tokenData) {

        // creating a new token instance and saving it to the database
        const token = await this.tokenModel.create(tokenData);

        return token;

    }

    // method to find a token by its value
    async findTokenByValue(value) {

        // finding a token in the database by its value
        return await this.tokenModel.findOne({ value }).lean();

    }

    // method to delete a token by its value
    async deleteTokenByValue(value) {

        // deleting a token from the database by its value
        return await this.tokenModel.deleteOne({ value });

    }

    // method to find the tokens by user
    async deleteTokenByEmail(email, type) {

        // finding and returning the token
        return await this.tokenModel.deleteOne({ email, type });

    }


}

export default TokenDAO;
