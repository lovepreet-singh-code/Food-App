const statusCode = require('../utils/statusCode');
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// GET USER INFGO
const getUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(statusCode.NOT_FOUND).send({
        success: false,
        message: "User Not Found",
      });
    }
    //hinde password
    user.password = undefined;
    //resp
    res.status(statusCode.OK).send({
      success: true,
      message: "User get Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Eror in Get User API",
      error,
    });
  }
};
   
// UPDATE USER
const updateUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(statusCode.NOT_FOUND).send({
        success: false,
        message: "user not found",
      });
    }
  //update
  const { username, address, phone } = req.body;
  if (username) user.username = username;
  if (address) user.address = address;
  if (phone) user.phone = phone;
  //save user
  await user.save();
  res.status(statusCode.OK).send({
    success: true,
    message: "USer Updated SUccessfully",
  });
} catch (error) {
  console.log(error);
  res.status(statusCode.INTERNAL_SERVER_ERROR).send({
    success: false,
    message: "Error In Udpate Userr API",
    error,
  });
}
};

// UPDATE USER PASSWORRD
const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //valdiation
    if (!user) {
      return res.status(statusCode.NOT_FOUND).send({
        success: false,
        message: "Usre Not Found",
      });
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "Please Provide Old or New PasswOrd",
      });
    }
    //check user password  | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "Invalid old password",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(statusCode.OK).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Error In Password Update API",
      error,
    });
  }
};

// RESET PASSWORd
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "Please Privide All Fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "User Not Found or invlaid answer",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(statusCode.OK).send({
      success: true,
      message: "Password Reset SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "eror in PASSWORD RESET API",
      error,
    });
  }
};


// DLEETE PROFILE ACCOUNT
const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(statusCode.OK).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Erorr In Delete Profile API",
      error,
    });
  }
};




module.exports = {
    getUserController,
    updateUserController,
    updatePasswordController,
    resetPasswordController,
    deleteProfileController,
};