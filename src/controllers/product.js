import Product from '../models/Product.js'
import { productValid } from '../validation/product.js';

export const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).json({ message: "Products not found" });
        }
        return res.status(200).json({ message: "Got products successfully", datas: products });
    } catch (error) {
        return res.status(500).json({ message: "Error while getting products", error: error });
    }
}

export const getDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Got product successfully", datas: product });
    } catch (error) {
        return res.status(404).json({ message: "Error getting product", error: error });
    }
}

export const create = async (req, res) => {
    try {
        const { error } = productValid.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message, });
        }
        const product = await Product.create(req.body);
        if (!product) {
            return res.status(404).json({ message: "Create product faild" });
        }
        return res.status(200).json({ message: "Created product successfully", datas: product });
    } catch (error) {
        return res.status(500).json({ message: "Error creating product", error: error });
    }
}

export const update = async (req, res) => {
    try {
        const { error } = productValid.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ message: error.details[0].message, });
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Update product faild" });
        }
        return res.status(200).json({ message: "Updated product successfully", datas: product });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

export const remove = async (req, res) => {
    try {
        const data = await Product.findById(req.params.id);
        if (!data) {
            return res.status(400).json({ message: "Product not found!" });
        }
        return res.status(200).json({ message: "Delete product successfully", datas: data });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}