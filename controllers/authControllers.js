const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const statusCode = require('../utils/statusCode');

const registerController = async (req, res) => {
    try {
        const { username, email, password, phone, address } = req.body ||{};
        
        //validation
        if (!username || !email || !password || !address || !phone ) {
          return res.status(statusCode.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Please Provide All Fields",
          });
          console.log(req.body);
        }
        
        // chekc user
        const exisiting = await userModel.findOne({ email });
        if (exisiting) {
          return res.status(statusCode.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Email Already Registerd please Login",
          });
        }
        // //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const user = await userModel.create({
          username,
          email,
          password: hashedPassword,
          address,
          phone
        });
        res.status(statusCode.CREATED).send({
          success: true,
          message: "Successfully Registered",
        });
      } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send({
          success: false,
          message: "Error In Register API",
          error,
        });
      }
    };

    
module.exports = { registerController };