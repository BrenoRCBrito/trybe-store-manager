function name(nameStr) {
  if (!nameStr) {
    const noNameError = { status: 400, message: '"name" is required' };
    throw noNameError;
  }
  if (nameStr.length < 5) {
    const nameLengthError = {
      status: 422,
      message: '"name" length must be at least 5 characters long',
    };
    throw nameLengthError;
  }
}

function existantName(names, nameStr) {
  const isExistant = names.some((n) => n === nameStr);
  if (isExistant) {
    const nameAlreadyUsedError = { status: 409, message: 'Product already exists' };
    throw nameAlreadyUsedError;
  }
}

function quantity(quantityNum) {
  if (quantityNum === undefined) {
    const noNameError = { status: 400, message: '"quantity" is required' };
    throw noNameError;
  }
  if (quantityNum <= 0) {
    const nameLengthError = {
      status: 422,
      message: '"quantity" must be greater than or equal to 1',
    };
    throw nameLengthError;
  }
}

module.exports = { name, existantName, quantity };
