import Joi from "joi";

export const resendEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "missing required field email",
    "string.email": "Email must be valid"
  }),
});
