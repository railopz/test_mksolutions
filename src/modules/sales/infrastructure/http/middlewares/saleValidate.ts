import { celebrate, Segments, Joi } from 'celebrate';

const createSaleMiddleware = celebrate({
  [Segments.BODY]: {
    transactions: Joi.array().items(
      Joi.object({
        product_id: Joi.string().required(),
        quantity: Joi.number().integer().positive().required(),
      }),
    ),
    client_id: Joi.string().uuid().allow(''),
  },
});

export { createSaleMiddleware };
