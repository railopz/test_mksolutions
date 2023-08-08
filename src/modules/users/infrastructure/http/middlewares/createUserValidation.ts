import { celebrate, Segments, Joi } from 'celebrate';

const createUserValidation = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required().min(4).max(20),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});

export { createUserValidation };
