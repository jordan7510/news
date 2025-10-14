import { BreakingNews } from "@/utils/Types";
import mongoose from "mongoose";

const breakingNewsSchema = new mongoose.Schema<BreakingNews>({
    language: {type:String,required:true},
    title: {type:String,required:true},
    authors: {type:[String],required:true},
    isActive: {type:Boolean,default:true},
    publishedTime: {type:String},
})

const BreakingNewsModel = mongoose.models.BreakingNews || mongoose.model("BreakingNews",breakingNewsSchema);
export default BreakingNewsModel
