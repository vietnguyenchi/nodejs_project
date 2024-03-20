import Joi from "joi";

export const cateogryValidator = Joi.object({
    name: Joi.string().required().min(5).max(255),
    slug: Joi.string().required().min(5).max(225),
}); 