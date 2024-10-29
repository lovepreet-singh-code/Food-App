const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const statusCode = require('../utils/statusCode');

const registerController = async (req, res) => {
    try {
        const { username, email, password, phone, address, answer } = req.body;
        
        //validation
        if (!username || !email || !password || !address || !phone || !answer ) {
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
         //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const user = await userModel.create({
          username,
          email,
          password:hashedPassword,
          address,
          phone,
          answer
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

    // LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validfatuion
    if (!email || !password) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "Please Provide EMail OR Password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(statusCode.NOT_FOUND).send({
        success: false,
        message: "User Not Found",
      });
    }
    
    //check user password  | compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
      user.password = undefined;
    res.status(statusCode.OK).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
     });
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Error In Login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };