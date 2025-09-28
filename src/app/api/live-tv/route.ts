import newsApi from "@/constants"
import axios from "axios"
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const res = await axios.get(newsApi.liveTv)
        const data = res.data;
        return NextResponse.json(data)
    } catch (error) {
        console.error("error fetching category", error)
    }    
}