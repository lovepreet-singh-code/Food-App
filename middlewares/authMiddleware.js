const JWT = require("jsonwebtoken");
const statusCode = require('../utils/statusCode');

module.exports = async (req, res, next) => {
    try {
      // get token
      const token = req.headers["authorization"].split(" ")[1];
      JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          return res.status(statusCode.UNAUTHORIZED).send({
            success: false,
            message: "Un-Authorize User",
          });
        } else {
          req.body.id = decode.id;
          next();
        }
      });
    } catch (error) {
      console.log(error);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "Please provide Auth Token",
        error,
      });
    }
  };