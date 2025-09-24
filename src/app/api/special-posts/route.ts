import axios from "axios";
import newsApi from "@/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        const url = req.nextUrl;
        const searchParams = url.searchParams;
        const language = searchParams.get("language")
        const limit = searchParams.get("limit")
        const offset = searchParams.get("offset")
        const res = await axios.get(`${newsApi.specialPosts}?language=${language}&limit=${limit}&offset=${offset}`);
        const data = res.data
        return NextResponse.json(data)
    } catch (error) {
        console.error("error getting special posts", error)
    }
}