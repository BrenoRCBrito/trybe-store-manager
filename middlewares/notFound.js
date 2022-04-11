module.exports = (_req, _res, next) =>
  next({ status: 404, message: "Opsss router not found" });
