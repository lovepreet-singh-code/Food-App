const foodModal = require("../models/foodModel");
const statusCode = require('../utils/statusCode');
// CREATE FOOD
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturnats,
      rating,
    } = req.body;
    //console.log(req.body)
    // if (!title || !description || !price || !resturnats) {
    //   return res.status(statusCode.BAD_REQUEST).send({
    //     success: false,
    //     message: "Please Provide all fields",
    //   });
      
    // }
    const newFood = new foodModal({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturnats,
      rating,
    });

    await newFood.save();
    res.status(statusCode.CREATED).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Error in create food api",
      error,
    });
  }
};

module.exports = {
    createFoodController
};