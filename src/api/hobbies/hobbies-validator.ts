import * as Joi from "joi";

export const createHobbyModel = Joi.object().keys({
	userId: Joi.string().required(),
	name: Joi.string().required(),
	passionLevel: Joi.string().required(),
	year: Joi.number().required(),
});

export const updateHobbyModel = Joi.object().keys({
	name: Joi.string().required(),
	passionLevel: Joi.string().required(),
	year: Joi.number().required(),
});