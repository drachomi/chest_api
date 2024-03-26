const logHandler = require("./log");

/* error handler. */
module.exports = (error, res, code = 400) => {
  logHandler.error(error);
 return res.status(code).json({ message:error, error });
};
