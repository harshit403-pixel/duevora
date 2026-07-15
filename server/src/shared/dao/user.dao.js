// Importing modules 
import User from "../models/user.model.js";

// class to handle user data access operations
class UserDao {

    constructor() {

        // initializing the user model
        this.UserModel = User;

    }

    // function to create a new user
    async createUser(userData) {

        // creating a new user using the user model and returning the created user
        const user = this.UserModel.create(userData);
        return user;

    }

    // function to find a user by email
    async findUserByEmail(email) {

        // finding a user by email using the user model and returning the found user
        return await this.UserModel.findOne({
            email: email
        });

    }

    // function to find a user by id
    async findUserById(id) {

        // finding a user by id using the user model and returning the found user
        return await this.UserModel.findById(id);

    }

    // function to update a user by id
    async updateUserById(id, updateData) {

        // updating a user by id using the user model and returning the updated user
        return await this.UserModel.findByIdAndUpdate(id, updateData, {
            returnDocument: "after",
        });

    }

}

export default UserDao;
