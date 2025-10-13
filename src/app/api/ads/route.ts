import dbConnect from "@/lib/dbConnect";
import Ads from "@/models/AdsModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const allAds = await Ads.find();
        return NextResponse.json({ data: allAds }, { status: 200 })
    } catch (error) {
        console.log("error", error);
        return NextResponse.json({
            message: "Error getting all ads.",
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
        let insertedAds;

        if (Array.isArray(body)) {
            if (body.length === 0)
                return NextResponse.json({ message: "Array is empty" }, { status: 400 });

            insertedAds = await Ads.insertMany(body); // bulk insert
        } else {
            insertedAds = await Ads.create(body); // single insert
        }

        return NextResponse.json(
            { message: "Ads inserted successfully", data: insertedAds },
            { status: 201 }
        );

    } catch (error) {
        console.error("Failed to insert ads:", error);
        return NextResponse.json(
            {
                message: "Failed to insert ads",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}