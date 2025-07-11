import Joi from "joi";

export const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().optional(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
}).min(1).messages({
  "object.min": "At least one field must be provided for update",
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `"favorite" is a required field`,
  }),
});
