import dbConnect from "@/lib/dbConnect";
import CategoryModel from "@/models/CategoryModel";
import PostModel from "@/models/PostModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest,{params}:{params:Promise<{category:string}>} ) {

    try {
        await dbConnect();
        const language = req.nextUrl.searchParams.get("language");
        const limit = parseInt(req.nextUrl.searchParams.get("limit") as string || "5", 10);
        const offset = parseInt(req.nextUrl.searchParams.get("offset") as string || "5", 10);
        const {category} = await params ;
        const categorySlug = new RegExp(`^${category}$`, "i")
        
        const categoryDoc = await CategoryModel.findOne({slug:categorySlug})
        
        if(!categoryDoc){
            return NextResponse.json({message:"Category not found", success:false},{status:404})
        }
       
        const res = await PostModel.find({
            language:language,
            category:categoryDoc._id
        })
        .limit(limit)
        .skip(offset)
        .populate("category")
        const count = res.length;
        
        return NextResponse.json({data: res,  message: "Fetch successfully", success: true,  count:count })
    } catch (error) {
        return NextResponse.json(
            {
                message: "Post fetch error",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            {
                status: 500
            }

        )
    }


}