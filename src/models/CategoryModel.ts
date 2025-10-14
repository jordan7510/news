import { Cat } from "@/utils/Types";
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema<Cat>({
    name: { type: String, required: true },
    slug: { type: String, required: true,unique:true },
    main: { type: Boolean, required: true },
    odia: { type: String, required: true },
    isActive: { type: Boolean, default:true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String},
    metaTitleOdia: { type: String },
    metaDescriptionOdia: { type: String },
    metaKeywords: { type: String},
    hasPosts: [{}],
    postCount: { type: Number },
    hasActivePosts: { type: Boolean }
}, { timestamps: true })

const CategoryModel = mongoose.models.Category || mongoose.model("Category", categorySchema)

export default CategoryModel