import mongoose from "mongoose";

const breakingNewsSchema = new mongoose.Schema({
    language: String,
    title: String,
    authors: String,
    isActive: Boolean,
    publishedTime: String,
    uid: String,
    __v: Number,
})

const BreakingNews = mongoose.models.breakingnews || mongoose.model("breakingnews",breakingNewsSchema);
export default BreakingNews
