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

module.exports = {
    createCatController,
};