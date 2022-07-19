import joi from "joi";

let userJoiSchema = joi.object({
  name: joi.string().min(2).max(32).label("Name").required().messages({
    "string.base": "User name is required",
    "string.empty": "User name should be string with min 2 chars",
    "string.min": "User name length should be Min 2 chars",
    "string.max": "User name length should be Max 32 chars",
    "any.required": "User name is required",
  }),
  email: joi.string().email().required().label("Email").messages({
    "string.base": "Email is required and should be valid email.",
    "string.empty": "Email shouldn't be emapty",
    "any.required": "Email is required",
  }),
});

export { userJoiSchema };
