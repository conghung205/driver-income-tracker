import prisma from "@/lib/prisma";
import { updateVehicleSchema } from "@/validations/vehicles.schema";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const body = await request.json();
        const resultResponse = updateVehicleSchema.safeParse(body);
        if (!resultResponse.success) {
            return NextResponse.json(
                { message: resultResponse.error.issues[0].message },
                { status: 400 },
            );
        }

        const vehicle = await prisma.vehicle.findFirst({
            where: { id, userId },
        });

        if (!vehicle) {
            return NextResponse.json(
                {
                    message: "Vehicle not found or unauthorized.",
                },
                { status: 404 },
            );
        }

        const { type, brand, model, plate } = resultResponse.data;

        if (plate && plate !== vehicle.plate) {
            const existingPlate = await prisma.vehicle.findUnique({
                where: { plate },
            });
            if (existingPlate) {
                return NextResponse.json(
                    { message: "The license plate number already exists." },
                    { status: 400 },
                );
            }
        }

        // update
        const updatedVehicle = await prisma.vehicle.update({
            where: { id },
            data: { type, brand, model, plate },
        });

        return NextResponse.json(
            {
                message: "Update vehicle successfully.",
                data: updatedVehicle,
            },
            { status: 200 },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Internal server error. Please try again later.",
            },
            { status: 500 },
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;

        const vehicle = await prisma.vehicle.findFirst({
            where: { id, userId },
        });

        if (!vehicle) {
            return NextResponse.json(
                {
                    message: "Vehicle not found or unauthorized.",
                },
                { status: 404 },
            );
        }

        // delete
        await prisma.vehicle.delete({
            where: { id },
        });

        return NextResponse.json(
            {
                message: "Delete vehicle successfully.",
            },
            { status: 200 },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Internal server error. Please try again later.",
            },
            { status: 500 },
        );
    }
}
