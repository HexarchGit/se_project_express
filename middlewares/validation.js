const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const name = Joi.string().min(2).max(30).required().messages({
  "string.min": 'The minimum length of the "name" field is 2',
  "string.max": 'The minimum length of the "name" field is 30',
  "string.empty": 'The "name" field must be filled in',
});

const avatar = Joi.string().required().custom(validateURL).messages({
  "string.empty": 'The "avatar" field must be filled in',
  "string.uri": 'The "avatar" field must be a valid url',
});

const email = Joi.string().email().required().messages({
  "string.empty": 'The "email" field must be filled in',
  "string.email": 'The "email" field must be a valid email',
});
const password = Joi.string().required().messages({
  "string.empty": 'The "password" field must be filled in',
});

const imageUrl = Joi.string().required().custom(validateURL).messages({
  "string.empty": 'The "imageUrl" field must be filled in',
  "string.uri": 'the "imageUrl" field must be a valid url',
});

const itemId = Joi.string().hex().length(24).required().messages({
  "string.empty": 'The "itemId" field must be filled in',
  "string.length": 'The "itemId" length must be 24 symbols',
  "string.hex": 'The "itemId" field must be hexadecimal',
});

const weather = Joi.string().valid("cold", "warm", "hot").required();

module.exports.validateCreateItem = celebrate({
  body: Joi.object().keys({
    name,
    weather,
    imageUrl,
  }),
});

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    name,
    avatar,
    email,
    password,
  }),
});

module.exports.validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name,
    avatar,
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email,
    password,
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    itemId,
  }),
});
