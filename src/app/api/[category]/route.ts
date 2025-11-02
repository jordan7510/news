import { generateCacheKey } from "@/helpers/generateCacheKey";
import dbConnect from "@/lib/dbConnect";
import CategoryModel from "@/models/CategoryModel";
import PostModel from "@/models/PostModel";
import { getCache } from "@/utils/getCache";
import { setCache } from "@/utils/setCache";
import { Post } from "@/utils/Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:{params:Promise<{category:string}>}) {
  try {
    const { category } = await params;
    const categorySlug = new RegExp(`^${category}$`, "i");
    const cacheKey = generateCacheKey(req.url);

    // //  Check cache first
    const cached = await getCache(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    await dbConnect();
    const language = req.nextUrl.searchParams.get("language");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "5", 10);
    const offset = parseInt(req.nextUrl.searchParams.get("offset") ?? "0", 10);
    const categoryDoc = await CategoryModel.findOne({ slug: categorySlug });
    if (!categoryDoc) {
      return NextResponse.json(
        { message: "Category not found", success: false },
        { status: 404 }
      );
    }
    const posts:Post[] = await PostModel.find({
      language,
      category: categoryDoc._id,
    })
      .limit(limit)
      .skip(offset)
      .populate("category");
    const count = posts.length;

    // Cache result
    await setCache(cacheKey, posts, 3600);

    return NextResponse.json(
      { data: posts, message: "Fetch successfully", success: true, count },
      { status: 200 }
    );
  } catch (error) {
    console.error("Post fetch error:", error);
    return NextResponse.json(
      {
        message: "Post fetch error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }


}
