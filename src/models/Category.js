import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        defaultValue: "Uncategorized",
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        defaultValue: "Uncategorized"
    },
    description: {
        type: String,
    },
    isHidden: {
        type: Boolean,
        default: false,
    },
    products: {
        type: [String],
        default: [],
    }
}, { versionKey: false, timestamps: true });

export default mongoose.model('Category', categorySchema);