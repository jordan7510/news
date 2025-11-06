import { generateCacheKey } from "@/helpers/generateCacheKey";
import dbConnect from "@/lib/dbConnect";
import isRedisEnabled, { getCache, setCache } from "@/lib/redisClient";
import CategoryModel from "@/models/CategoryModel";
import PostModel from "@/models/PostModel";

import { NextRequest, NextResponse } from "next/server";


export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ category: string, slug: string }> }
) {

    try {
        const { category, slug } = await params;
        const categoryRegex = new RegExp(`^${category}$`, "i")
        const slugRegex = new RegExp(`^${slug}$`, "i")
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
        await dbConnect();
        const categoryDoc = await CategoryModel.findOne({ slug: categoryRegex })

        if (!categoryDoc) {
            return NextResponse.json({ message: "Category not found", success: false }, { status: 404 })
        }

        const post = await PostModel.findOne({
            slug: slugRegex,
            "category": categoryDoc._id,
            status: "ACTIVE"
        }).populate("category");

        if (!post) {
            return NextResponse.json({ message: "Post not found.", success: false }, { status: 404 })
        }
        await setCache(cacheKey, post, 3600)
        return NextResponse.json({ data: post, message: "Fetch successfully", success: true })
    } catch (error) {
        console.error(error)
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