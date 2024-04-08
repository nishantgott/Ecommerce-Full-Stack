import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        if (!name) res.status(500).send({ success: false, message: 'Name missing' });
        if (!description) res.status(500).send({ success: false, message: 'description missing' });
        if (!price) res.status(500).send({ success: false, message: 'price missing' });
        if (!category) res.status(500).send({ success: false, message: 'category missing' });
        if (!quantity) res.status(500).send({ success: false, message: 'quantity missing' });
        if (!shipping) res.status(500).send({ success: false, message: 'shipping missing' });
        if (photo && photo.size > 1000000) res.status(500).send({ success: false, message: 'image too big' });

        const product = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        res.status(200).send({ success: true, message: 'Successful', product });

    } catch (error) {
        res.status(500).send({ success: false, error });
    }
}

export const getAllProductsController = async (req, res) => {
    try {
        const products = await productModel.find({}).select("-photo").limit(10).sort({ createdAt: -1 });
        res.status(200).send({ success: true, message: 'Successful', products });
    } catch (error) {
        res.status(500).send({ success: false, error });
    }
}

export const getProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug });
        res.status(200).send({ success: true, message: 'Successful', product });
    } catch (error) {
        res.status(500).send({ success: false, error });
    }
}

//get photo of product using id
export const getProductPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('photo');
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType);
            res.status(200).send(product.photo.data);
        }
    } catch (error) {
        res.status(500).send({ success: false, error });
    }
}

//delete product using id
export const deleteProductController = async (req, res) => {
    try {
        const product = await productModel.deleteOne({ _id: req.params.pid });
        res.status(200).send({ success: true, message: 'Successfully deleted', product });
    } catch (error) {
        res.status(500).send({ success: false, error });
    }
}

export const getFilteredProductsController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        const args = {};
        if (checked.length) args.category = checked;
        const x = parseInt(radio[0], 10);
        const y = parseInt(radio[1], 10);
        if (radio.length) args.price = { $gte: x, $lte: y };
        const products = await productModel.find(args);
        const temp = typeof x;
        res.status(200).send({ temp, checked, radio, success: true, message: 'Successfully done', products });
    } catch (error) {
        res.status(500).send({ success: false, error });
    }
}

export const productCountController = async (req, res) => {
    try {
        const count = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({ count, message: 'Counted succesfully' });
    } catch (error) {
        res.status(500).send({ success: false, error });
    }
}

export const productListController = async (req, res) => {
    try {
        const pageNo = req.params.page ? req.params.page : 1;
        const perPage = 3;
        const products = await productModel.find({}).select("-photo").skip(perPage * (pageNo - 1)).limit(perPage);
        res.status(200).send({ products, success: true });
    } catch (error) {
        res.status(500).send({ success: false, error });
    }
}

export const productSearchController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const products = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select("-photo");
        res.json(products);
    } catch (error) {
        res.status(500).send({ success: false, error });
    }
}

export const productsWithCategoryController = async (req, res) => {
    try {
        // const cat = 'laptops';
        const { cat } = req.params;
        const temp = await categoryModel.findOne({ slug: cat });
        const c_id = temp._id;
        const products = await productModel.find({ category: c_id }).select("-photo");
        res.status(200).send({ products, success: true });
    } catch (error) {
        res.status(500).send({ success: false, error });
    }
}