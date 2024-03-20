import Joi from "joi";

export const productValid = Joi.object({
    name: Joi.string().required().min(5),
    price: Joi.number().required().min(5),
    description: Joi.string()
});