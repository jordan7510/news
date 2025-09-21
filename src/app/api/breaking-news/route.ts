import axios from "axios";
import newsApi from "@/constants";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const res = await axios.get(newsApi.breakingNews);
        const data = res.data.data
        return NextResponse.json(data)
    } catch (error) {
        console.error("error getting breaking news", error)
       
    }
}