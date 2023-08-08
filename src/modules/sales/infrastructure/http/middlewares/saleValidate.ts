import { celebrate, Segments, Joi } from 'celebrate';

const createSaleMiddleware = celebrate({
  [Segments.BODY]: {
    transactions: Joi.array()
      .items(
        Joi.object({
          quantity: Joi.number().integer().min(1).required(),
          id: Joi.string().uuid().required(),
        }),
      )
      .min(1)
      .required(),
    client_id: Joi.string().uuid(),
  },
});

export { createSaleMiddleware };
