const Joi = require('joi');

const isJoiError = Joi.isError;

const productsSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});
const salesSchema = Joi.array().items(
  Joi.object({
    quantity: Joi.number().min(1).required().messages({
      'number.min': '"quantity" must be greater than or equal to 1',
      'any.required': '"quantity" is required',
    }),
    productId: Joi.number()
      .required()
      .messages({ 'any.required': '"productId" is required' }),
  }),
);

const checkProducts = async (body) =>
  productsSchema.validateAsync(body, { convert: true });
const checkSales = async (body) =>
  salesSchema.validateAsync(body, { convert: true });

module.exports = {
  validateBody: { products: checkProducts, sales: checkSales },
  isJoiError,
};
