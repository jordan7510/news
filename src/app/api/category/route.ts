import dbConnect from "@/lib/dbConnect";
import CategoryModel from "@/models/CategoryModel";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        dbConnect();
        const allCategory = await CategoryModel.find();

        return NextResponse.json({ data: allCategory,success:true,message:"Fetch success" }, { status: 200 })
    } catch (error) {
        console.log("error", error);
        return NextResponse.json(
            {
                message: "Error getting all Categories.",
                error: error instanceof Error ? error.message : "Unknow error",
                status: false,
            },
            { status: 500 }
        )   
    }
}

export async function POST(req: Request) {

    try {
        dbConnect();
        const body = await req.json();
        if (!body) {
            return NextResponse.json({ message: "Request body is empty" }, { status: 400 });
        }
        let insertedCategory;
        if (Array.isArray(body)) {
            if (body.length === 0) return NextResponse.json({ message: "Array is empty" }, { status: 400 });
            insertedCategory = await CategoryModel.insertMany(body);
        } else {
            insertedCategory = await CategoryModel.create(body);
        }

        return NextResponse.json(
            { message: "Category inserted successfully", data: insertedCategory },
            { status: 201 }
        );

    } catch (error) {
        console.error("Failed to insert Category:", error);
        return NextResponse.json(
            {
                message: "Failed to insert Categories",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}