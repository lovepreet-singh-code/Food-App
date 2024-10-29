const statusCode = require('../utils/statusCode');
const userModel = require("../models/userModel");

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

module.exports = {
    getUserController,
    updateUserController,
};