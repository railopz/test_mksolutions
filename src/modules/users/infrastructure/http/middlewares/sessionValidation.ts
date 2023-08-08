import { celebrate, Segments, Joi } from 'celebrate';

const sessionValidation = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});

export { sessionValidation };
