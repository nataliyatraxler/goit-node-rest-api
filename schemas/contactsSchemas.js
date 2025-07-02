import Joi from "joi";

// Схема для створення нового контакту
export const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().optional(),
});

// Схема для оновлення контакту (мінімум 1 поле)
export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
}).min(1);

// Схема для оновлення статусу favorite
export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
