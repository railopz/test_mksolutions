import { celebrate, Segments, Joi } from 'celebrate';

const idValidatedMiddleware = celebrate({
  [Segments.PARAMS]: {
    produc_id: Joi.string().uuid().required(),
  },
});

const createOrUpdateProductMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().min(4).max(20).required(),
    description: Joi.string().required(),
    price: Joi.number().precision(2).min(0).required(),
  },
});

const createStockProductMiddleware = celebrate({
  [Segments.BODY]: {
    quantity: Joi.number().min(0).required(),
    type: Joi.string().valid('Input', 'Output').required(),
  },
});

export {
  idValidatedMiddleware,
  createOrUpdateProductMiddleware,
  createStockProductMiddleware,
};
