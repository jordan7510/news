import dbConnect from "@/lib/dbConnect";
import CategoryModel from "@/models/CategoryModel";
import PostModel from "@/models/PostModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ category: string, slug: string }> }
) {

    try {
        await dbConnect();
        const { category, slug } = await params;
        const searchCategory = new RegExp(`^${category}$`, "i")
        const searchSlug = new RegExp(`^${slug}$`, "i")
        const categoryDoc = await CategoryModel.findOne({ slug: searchCategory })

        if (!categoryDoc) {
            return NextResponse.json({ message: "Category not found", success: false }, { status: 404 })
        }

        const res = await PostModel.findOne({
            slug: searchSlug
        }).populate("category")

        return NextResponse.json({ data: res, message: "Fetch successfully", success: true })
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