import { AdsContextType } from "@/utils/Types";
import mongoose from "mongoose";

const adsSchema = new mongoose.Schema<AdsContextType>({
    brand_name: {type:String,required:true},
    advetisement_name: {type:String,required:true},
    ad_platform: {type:String,required:true},
    ad_type: {type:String,required:true},
    ad_link: {type:String,required:true},
    daily_impression_limit: {type:Number,default:0},
    schedule: {type:String},
    status: {type:String,default:"Active"},
    ad_image: {type:String,required:true},
    language: {type:String,required:true},
    publish: {type:Date,default:Date.now()}
})

const AdModel = mongoose.models.Ads || mongoose.model("Ads",adsSchema);
export default AdModel
