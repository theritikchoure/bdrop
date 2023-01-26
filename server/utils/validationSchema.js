
const Joi = require('joi');

const loginOtpSchema = Joi.object({
    mobile: Joi.string().required().regex(/^[1-9][0-9]{9}$/).label('Mobile'),
    user_type: Joi.string().required().label('User type'),
});

const verifyOtpSchema = Joi.object({
    mobile: Joi.string().required().regex(/^[1-9][0-9]{9}$/),
    user_type: Joi.string().required().label('User type'),
    otp: Joi.number().required(),

    agent: Joi.string().optional(),
    ip: Joi.string().optional(),
});

const updateMeSchema = Joi.object({
    name: Joi.string().required(),
    bloodgroup: Joi.string().required(),
    email: Joi.string().email(),
    mobile: Joi.string().required().regex(/^[1-9][0-9]{9}$/),
    password: Joi.string().required(),
    repeat_password: Joi.string().required().valid(Joi.ref('password')),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipcode: Joi.string().required().regex(/^[1-9][0-9]{5}$/),
});

module.exports = {
    loginOtpSchema, verifyOtpSchema, updateMeSchema
}
  