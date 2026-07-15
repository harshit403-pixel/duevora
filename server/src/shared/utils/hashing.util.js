// Importing modules
import bcrypt from "bcryptjs";

// function to hash the password
async function hashPassword(password) {

    // hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // returning the hashed password
    return hashedPassword;

}

// function to compare the password
async function comparePassword(password, hashedPassword) {

    // comparing the password using bcrypt
    const isMatch = await bcrypt.compare(password, hashedPassword);

    // returning the result
    return isMatch;

}

// exporting the functions
export { hashPassword, comparePassword };