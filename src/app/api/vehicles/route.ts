import prisma from "@/lib/prisma";
import { createVehicleSchema } from "@/validations/vehicles.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const resultResponse = createVehicleSchema.safeParse(body);
        if (!resultResponse.success) {
            return NextResponse.json(
                { message: resultResponse.error.issues[0].message },
                { status: 400 },
            );
        }

        const { type, brand, model, plate } = resultResponse.data;

        const existingPlate = await prisma.vehicle.findUnique({
            where: { plate },
        });

        if (existingPlate) {
            return NextResponse.json(
                { message: "The license plate number already exists." },
                { status: 400 },
            );
        }

        const newVehicle = await prisma.vehicle.create({
            data: { type, brand, model, plate, userId },
        });

        return NextResponse.json(
            {
                message: "Create Vehicle successfully",
                data: newVehicle,
            },
            { status: 201 },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 },
        );
    }
}

export async function GET(request: NextRequest) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const vehicles = await prisma.vehicle.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(
            { message: "Get vehicles successfully", data: vehicles },
            { status: 200 },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 },
        );
    }
}
