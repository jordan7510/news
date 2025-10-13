import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import BreakingNews from "@/models/BreakingNewsModel";
import { FilterQuery } from "mongoose";

export async function GET(req:NextRequest){
    try {
        await dbConnect();
        // const {searchParams} = new URL(req.url);
        const language = req.nextUrl.searchParams.get("language")
        const query:FilterQuery<typeof BreakingNews> ={};
        if(language) query.language = language;
        const allBreakingNews = await BreakingNews.find(query).sort({publishedTime:-1});
        return NextResponse.json({ data: allBreakingNews }, { status: 200 })
    } catch (error) {
        console.log("error", error);
        return NextResponse.json({
            message: "Error getting all breaking news.",
            error: error instanceof Error ? error.message : "Unknow error",
            status: false,
        },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        if (!body) {
            return NextResponse.json({ message: "Request body is empty" }, { status: 400 });
        }
        let insertedBreakingNews;

        if (Array.isArray(body)) {
            if (body.length === 0)
                return NextResponse.json({ message: "Array is empty" }, { status: 400 });

            insertedBreakingNews = await BreakingNews.insertMany(body); // bulk insert
        } else {
            insertedBreakingNews = await BreakingNews.create(body); // single insert
        }

        return NextResponse.json(
            { message: "BreakingNews inserted successfully", data: insertedBreakingNews },
            { status: 201 }
        );

    } catch (error) {
        console.error("Failed to insert BreakingNews:", error);
        return NextResponse.json(
            {
                message: "Failed to insert BreakingNews",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}