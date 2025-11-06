import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import PostModel from "@/models/PostModel";

import { generateCacheKey } from "@/helpers/generateCacheKey";
import isRedisEnabled, { getCache, setCache } from "@/lib/redisClient";


export async function GET(req: NextRequest) {
    try {
        const cacheKey = generateCacheKey(req.url)
        if (isRedisEnabled()) {
            const cached = await getCache(cacheKey)
            if (cached) {
                console.log("cached hit");
                const count = cached.length
                return NextResponse.json({ data: cached, message: "Fetched successfully", success: true, count: count }, { status: 200 })
            }
        }
        console.log("Cached not available,Fetching form DB");
        await dbConnect()
        const url = req.nextUrl;
        const searchParams = url.searchParams;
        const language = searchParams.get("language");
        const limit = parseInt(searchParams.get("limit") || "10", 10)
        const offset = parseInt(searchParams.get("offset") || "10", 10)

        // const sortField = searchParams.get("sortField") || "publishedTime"; // default sorting field, OPTIONAL
        // const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1; // asc = 1, desc = -1, OPTIONAL
        // const res = await PostModel.aggregate([
        //     { $match: { status: "ACTIVE", language: language } },
        //     {
        //         $lookup: {
        //             from: "categories",
        //             localField: "category",
        //             foreignField: "_id",
        //             as: "categoryData"
        //         }
        //     },
        //     { $sort: { publishedTime: -1 } },
        //     { $limit: limit },
        //     { $skip: offset }
        // ]);

        const res = await PostModel.find({
            language: language,
            status: "ACTIVE"
        })
        .limit(limit)
        .populate("category")
        .sort({ publishedTime: -1 })
        .skip(offset)

        await setCache(cacheKey, res, 3600)
        const count = res.length
        return NextResponse.json({ data: res, message: "Fetched successfully", success: true, count: count }, { status: 200 })
    } catch (error) {
        console.error("error getting special posts", error)
        return NextResponse.json({ success: false, message: "Error getting special posts." }, { status: 500 })
    }
}


