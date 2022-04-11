const { validateBody, isJoiError } = require("../utils/joiSchemas");

const formatError = (error) => {
  const status = {
    "string.min": 422,
    "string.base": 422,
    "number.base": 422,
    "number.integer": 422,
    "number.min": 422,
    "any.required": 400,
  };
  if (isJoiError(error)) {
    return {
      message: error.message,
      status: status[error.details[0].type],
    };
  }
  return error;
};

const products = async (req, _res, next) => {
  const { name, quantity } = req.body;
  try {
    await validateBody.products({ name, quantity });
    return next();
  } catch (error) {
    console.log(error);
    return next(formatError(error));
  }
};

const sales = async (req, _res, next) => {
  try {
    await validateBody.sales(req.body);
    return next();
  } catch (error) {
    console.log(error);
    return next(formatError(error));
  }
};
module.exports = { sales, products };
