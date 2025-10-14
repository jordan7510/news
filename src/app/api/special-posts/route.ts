import axios from "axios";
import newsApi from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import PostModel from "@/models/PostModel";


export async function GET(req:NextRequest){
    try {
        const url = req.nextUrl;
        const searchParams = url.searchParams;
        const language = searchParams.get("language");
        const limit = searchParams.get("limit")
        const offset = searchParams.get("offset")
        const res = await axios.get(`${newsApi.specialPosts}?language=${language}&limit=${limit}&offset=${offset}`);
        const data = res.data
        return NextResponse.json(data)
    } catch (error) {
        console.error("error getting special posts", error)
    }
}


export async function POST(req: Request) {

    try {
        dbConnect();
        const body = await req.json();
        if (!body) {
            return NextResponse.json({ message: "Request body is empty" }, { status: 400 });
        }
        let insertedPost;
        if (Array.isArray(body)) {
            if (body.length === 0)
                return NextResponse.json({ message: "Array is empty" }, { status: 400 });

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
            {
                message: "Failed to insert Posts",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}