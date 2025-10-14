import mongoose from "mongoose";
import { Post } from "@/utils/Types";

const PostSchema = new mongoose.Schema<Post>(
  {
    language: { type: String},
    postType: { type: String },
    isSpecial: { type: Boolean, default: false },
    videoUrl: { type: String },
    title: { type: String },
    highlights: { type: String },
    location: { type: String },
    body: { type: String },
    selectCategory: { type: String },
    isBreaking: { type: Boolean, default: false },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    authors: { type: [String] },
    publishedTime: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    articleSource: { type: String },
    url: { type: String },
    slug: { type: String, unique: true },
    status: { type: Boolean, default: true },
    scheduledTime: { type: String },
    views: { type: Number, default: 0 },
    content: { type: String },
    position: { type: Number },
    assets: [{ type: String }],
    prefix: { type: String },
    keywords: [{ type: String }],
    uid: { type: String },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

const PostModel = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default PostModel;
