const resturantModel = require("../models/resturantModel");
const statusCode = require('../utils/statusCode');

// CREATE RESTURANT
const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    // validation
    if (!title || !coords) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "please provide title and address",
      });
    }
    const newResturant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newResturant.save();

    res.status(statusCode.CREATED).send({
      success: true,
      message: "New Resturant Created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Error In Create Resturant api",
      error,
    });
  }
};

// GET ALL RESTURNAT
const getAllResturantController = async (req, res) => {
  try {
    const resturants = await resturantModel.find({});
    if (!resturants) {
      return res.status(statusCode.NOT_FOUND).send({
        success: false,
        message: "No Resturant Availible",
      });
    }
    res.status(statusCode.OK).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Error In Get ALL Resturat API",
      error,
    });
  }
};

// GET RESTURNAT BY ID
const getResturantByIdController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Resturnat ID",
      });
    }
    //find resturant
    const resturant = await resturantModel.findById(resturantId);
    if (!resturant) {
      return res.status(statusCode.NOT_FOUND).send({
        success: false,
        message: "no resturant found",
      });
    }
    res.status(statusCode.OK).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Error In Get Resturarnt by id api",
      error,
    });
  }
};

//DELETE RESTRURNAT
const deleteResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(statusCode.NOT_FOUND).send({
        success: false,
        message: "No Resturant Found OR Provide Resturant ID",
      });
    }
    await resturantModel.findByIdAndDelete(resturantId);
    res.status(statusCode.OK).send({
      success: true,
      message: "Resturant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Eror in delete resturant api",
      error,
    });
  }
};
module.exports = {
    createResturantController,
    getAllResturantController,
    getResturantByIdController,
    deleteResturantController,
  };