import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const res = await axios.get("https://argusnews.in/api/all-ads");
        const data = res.data;
        return NextResponse.json(data)
    } catch (error) {
        console.error("error getting ads", error)
    }

}