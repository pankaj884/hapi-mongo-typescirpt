import * as Joi from "joi";

export const createUserModel = Joi.object().keys({
	name: Joi.string().required(),
});

export const updateUserModel = Joi.object().keys({
	name: Joi.string(),
});


export const jwtValidator = Joi.object({ 'authorization': Joi.string().required() }).unknown();