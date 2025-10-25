import dbConnect from "@/lib/dbConnect";
import PostModel from "@/models/PostModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
       
        await dbConnect();
        const body = await req.json();
        if (!body) {
            return NextResponse.json({ message: "Request body is empty" }, { status: 400 });
        }
        let insertedPost;
        if (Array.isArray(body)) {
            if (body.length === 0) return NextResponse.json({ message: "Array is empty" }, { status: 400 });
            insertedPost = await PostModel.insertMany(body);
        } else {
            insertedPost = await PostModel.create(body);
        }
        return NextResponse.json(
            { message: "Post inserted successfully", data: insertedPost },
            { status: 201 }
        );

    } catch (error) {
        console.error("Failed to insert Post:", error);
        return NextResponse.json(
            { message: "Failed to insert Posts", error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}


export async function GET(req: NextRequest) {
    try {
        await dbConnect()
        const url = req.nextUrl;
        const searchParams = url.searchParams;
        const limit = parseInt(searchParams.get("limit") || "10", 10)
        // const offset = parseInt(searchParams.get("offset") || "10", 10)
        // console.log("offset",offset);

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
        const res = await PostModel.find()
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

