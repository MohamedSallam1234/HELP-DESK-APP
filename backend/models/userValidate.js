const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().required().max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(1000)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])'))
        .message('Password must contain at least one lowercase and one uppercase letter'),
});

module.exports = { userSchema };
