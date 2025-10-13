import mongoose from "mongoose";

const adsSchema = new mongoose.Schema({
    brand_name: String,
    advetisement_name: String,
    ad_platform: String,
    ad_type: String,
    ad_link: String,
    daily_impression_limit: Number,
    schedule: String,
    status: String,
    ad_image: String,
    language: String,
    publish: Date
})

const Ads = mongoose.models.Ads || mongoose.model("Ads",adsSchema);
export default Ads
