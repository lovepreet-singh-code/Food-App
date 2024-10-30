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
        return res.status(statusCode.NOT_FOUND).send({
          success: false,
          message: "No Categories found",
        });
      }
      res.status(statusCode.OK).send({
        success: true,
        totalCat: categories.length,
        categories,
      });
    } catch (error) {
      console.log(error);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "Erorr in get All Categpry API",
        error,
      });
    }
  };

  // UPDATE CATE
const updateCatController = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, imageUrl } = req.body;
      const updatedCategory = await categoryModel.findByIdAndUpdate(
        id,
        { title, imageUrl },
        { new: true }
      );
      if (!updatedCategory) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({
          success: false,
          message: "No Category Found",
        });
      }
      res.status(statusCode.OK).send({
        success: true,
        message: "Category Updated Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "error in update cat api",
        error,
      });
    }
  };
  
module.exports = {
    createCatController,
    getAllCatController,
    updateCatController,
};