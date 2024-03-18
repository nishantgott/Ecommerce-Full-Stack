import slugify from 'slugify';
import categoryModel from '../models/categoryModel.js'

export const createCategoryController = async (req, res) => {
    console.log('Hello how are you');
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(500).send('Type a name bud!');
        }

        const existingcategory = await categoryModel.findOne({ name });
        if (existingcategory) {
            return res.status(500).send('Category already exists');
        }

        const category = await new categoryModel(
            {
                name,
                slug: slugify(name)
            }).save();

        res.status(201).send({ success: true, message: 'Category Created' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'something went wrong' });
    }
} 