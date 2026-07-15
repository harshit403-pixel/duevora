// making a async wrapper function to handle errors in async functions
function asyncWrapper(fn) {

    return async (req, res, next) => {

        // calling the async function and catching any errors
        Promise.resolve(fn(req, res, next)).catch(err => next(err));

    }

}

export default asyncWrapper;