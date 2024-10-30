const categoryModel = require("../models/categoryModel");
const statusCode = require('../utils/statusCode');

// CREATE CAT
const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    //valdn
    if (!title) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "please provide category title or image",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(statusCode.CREATED).send({
      success: true,
      message: "category created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Error In Create Cat API",
      error,
    });
  }
};
// GET ALL CAT
const getAllCatController = async (req, res) => {
    try {
      const categories = await categoryModel.find({});
      if (!categories) {
        return res.status(404).send({
          success: false,
          message: "No Categories found",
        });
      }
      res.status(200).send({
        success: true,
        totalCat: categories.length,
        categories,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in get All Categpry API",
        error,
      });
    }
  };

module.exports = {
    createCatController,
    getAllCatController,
};