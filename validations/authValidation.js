const { z } = require("zod");

const signupSchema = z.object({
    username: z
        .string({required_error: "username is required."})
        .trim()
        .min(3, "username should be atleast 3 character.")
        .max(255,"username should be less than 255 character."),
    password: z
        .string({required_error: "Password Number is required."})
        .trim()
        .min(6,"password should be atleast 6 character.")
        .max(1024, "password should be less than 1024 character."),
    contact: z
        .string({required_error: "Contact Number is required."})
        .trim()
        .min(10,"Contact number can't be less than 10 digits.")
        .max(10, "Contact number can't be greater than 10 digits."),
    email: z
        .string({required_error: "Email is required."})
        .trim()
        .email("Invalid Email.")
        .min(5,"Email should be minimum of 5 character.")
        .max(255, "Email should be less than 255 character.")
});
const loginSchema = z.object({
    email: z
        .string({required_error: "Email is required."})
        .trim()
        .email("Invalid Email.")
        .min(5,"Email should be minimum of 5 character.")
        .max(255, "Email should be less than 255 character."),
    password: z
        .string({required_error: "Password Number is required."})
        .trim()
        .min(6,"password should be atleast 6 character.")
        .max(1024, "password should be less than 1024 character.")
});

const contactSchema = z.object({
    username: z
        .string({required_error: "username is required"})
        .trim()
        .min(3, "username should be atleast 3 character.")
        .max(255,"username should be less than 255 character."),
    email: z
        .string({required_error: "Email is required."})
        .trim()
        .email("Invalid Email.")
        .min(5,"Email should be minimum of 5 character.")
        .max(255, "Email should be less than 255 character."),
    message: z
        .string({required_error: "message is required."})
        .trim()
        .min(10, "message is atleast of 10 character")
});
module.exports = {signupSchema, loginSchema, contactSchema};