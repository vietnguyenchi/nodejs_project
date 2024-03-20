import Category from "../models/Category.js";
import { cateogryValidator } from "../validation/category.js";

export const getAll = async (req, res) => {
    try {
        const data = await Category.find();

        if (!data || data.length === 0) return res.status(404).json({ message: "No category found" });

        return res.status(200).json({ message: "Category found", datas: data });
    } catch (error) {
        return res.status(500).json({ name: error.name, message: error.message });
    }
}

export const getDetail = async (req, res) => {
    try {
        const data = await Category.findById(req.params.id);

        if (!data) return res.status(404).json({ message: "No category found" });

        return res.status(200).json({ message: "Category found", datas: data });
    } catch (error) {
        return res.status(500).json({ name: error.name, message: error.message });
    }
}

export const create = async (req, res) => {
    try {
        const { error } = cateogryValidator.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({ message: errors })
        }

        const data = await Category.create(req.body);

        if (!data) return res.status(404).json({ message: "Create category faild" });

        return res.status(200).json({ message: "Created category successful", datas: data });
    } catch (error) {
        return res.status(500).json({ name: error.name, message: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const { error } = cateogryValidator.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({ message: errors })
        }

        const data = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!data) return res.status(404).json({ message: "Update category faild" });

        return res.status(200).json({ message: "Updated category successful", datas: data });
    } catch (error) {
        return res.status(500).json({ name: error.name, message: error.message });
    }
}

export const remove = async (req, res) => {
    try {
        const data = await Category.findByIdAndDelete(req.params.id);

        if (!data) return res.status(404).json({ message: "Delete category faild" });

        return res.status(200).json({ message: "Deleted category successful", datas: data });
    } catch (error) {
        return res.status(500).json({ name: error.name, message: error.message });
    }
}

