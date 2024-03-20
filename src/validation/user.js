import Joi from "joi";

export const signUpValidator = Joi.object({
    userName: Joi.string().required().min(6).max(225).messages({
        "string.empty": "Username cannot be empty",
        "any.required": "userName is required",
        "string.min": "Username must be at least {#limit} characters",
        "string.max": "Username only contains {#limit} characters",
    }),
    email: Joi.string().required().email().messages({
        "string.empty": "Email cannot be empty",
        "any.required": "Email is required",
        "string.email": "Invalid email"
    }),
    password: Joi.string().required().min(6).max(225).messages({
        "string.empty": "Password cannot be empty",
        "any.required": "Password is required",
        "string.min": "Password must be at least {#limit} characters",
        "string.max": "Password only contains {#limit} characters",
    }),
    confirmPassword: Joi.string().required().min(6).max(225).valid(Joi.ref("password")).messages({
        "string.empty": "Confirm password cannot be empty",
        "any.required": "Confirm password is required",
        "string.min": "Confirm password must be at least {#limit} characters",
        "string.max": "Confirm password only contains {#limit} characters",
        "any.only": "Confirm password did not match with password"
    }),
    role: Joi.string()
})

export const signInValidator = Joi.object({
    email: Joi.string().required().email().messages({
        "string.empty": "Email cannot be empty",
        "any.required": "Email is required",
        "string.email": "Invalid email"
    }),
    password: Joi.string().required().min(6).max(225).messages({
        "string.empty": "Password cannot be empty",
        "any.required": "Password is required",
        "string.min": "Password must be at least {#limit} characters",
        "string.max": "Password only contains {#limit} characters",
    }),
})