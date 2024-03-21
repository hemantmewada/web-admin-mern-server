const validationMiddleware = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    } catch (error) {
        const message = error.errors[0].message;
        // console.log("Error in signupValidation: ",error);
        return res.status(500).send({
            status: false,
            message,
            validationError: error
        });
    }
}

module.exports = {validationMiddleware};