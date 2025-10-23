import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import PostModel from "@/models/PostModel";
import { FilterQuery } from "mongoose";


export async function GET(req: NextRequest) {
    try {
        await dbConnect()
        const url = req.nextUrl;
        const searchParams = url.searchParams;
        const language = searchParams.get("language");
        const limit = parseInt(searchParams.get("limit") || "10", 10)
        // const offset = parseInt(searchParams.get("offset") || "10", 10)
        // console.log("offset",offset);
        
        const query: FilterQuery<typeof PostModel> = {}
        if (language) query.language = language;

        // const sortField = searchParams.get("sortField") || "publishedTime"; // default sorting field, OPTIONAL
        // const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1; // asc = 1, desc = -1, OPTIONAL
        // const res = await PostModel.aggregate([
        //     { $match: { isActive: true } },
        //     {
        //         $lookup: {
        //             from: "categories",
        //             localField: "category",
        //             foreignField: "_id",
        //             as: "categoryData"
        //         }
        //     },
        //     { $sort: { publishedTime: -1 } },
        //     { $limit: 10 },
        //     { $skip: 0 }
        // ]);
        const res= await PostModel.find(query)
        .populate("category")
        .sort({publishedTime:-1})
        .limit(limit)
        const count = res.length
        ;
        return NextResponse.json({data:res,message:"Fetched successfully",success:true,count:count},{status:200})
    } catch (error) {
        console.error("error getting special posts", error)
    }
}

