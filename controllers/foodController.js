const { stat } = require("fs/promises");
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

// GET ALLL FOODS
const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModal.find({});
    if (!foods) {
      return res.status(statusCode.NOT_FOUND).send({
        success: false,
        message: "no food items was found",
      });
    }
    res.status(statusCode.OK).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Erro In Get ALL Foods API",
      error,
    });
  }
};
// GET SINGLE FOOD
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(statusCode.NOT_FOUND).send({
        success: false,
        message: "please provide id",
      });
    }
    const food = await foodModal.findById(foodId);
    if (!food) {
      return res.status(statusCode.NOT_FOUND).send({
        success: false,
        message: "No Food Found with htis id",
      });
    }
    res.status(statusCode.OK).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }
};

// GET FOOD BY RESTURANT
const getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(statusCode.NOT_FOUND).send({
        success: false,
        message: "please provide id",
      });
    }
    const food = await foodModal.find({ resturnat: resturantId });
    if (!food) {
      return res.status(statusCode.NOT_FOUND).send({
        success: false,
        message: "No Food Found with htis id",
      });
    }
    res.status(statusCode.OK).send({
      success: true,
      message: "food base on restuatrnt",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }
};

module.exports = {
    createFoodController,
    getAllFoodsController,
    getSingleFoodController,
    getFoodByResturantController
};