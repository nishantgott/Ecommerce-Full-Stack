import categoryModel from "../models/categoryModel.js";

export const categoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.status(200).send({ success: true, categories });
    } catch (error) {
        res.status(500).send({ status: false, error });
    }
}

export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ _id: req.params.id });
        res.status(200).send({ success: true, category });
    } catch (error) {
        res.status(500).send({ success: false, error });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const category = await categoryModel.deleteOne({ _id: req.params.id });
        res.status(200).send({ success: true, category });
    } catch (error) {
        res.status(500).send({ success: false, error });
    }
}