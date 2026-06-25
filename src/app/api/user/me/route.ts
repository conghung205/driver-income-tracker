import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json(
            { message: "Invalid or expired access token." },
            { status: 401 },
        );
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found or unauthorized." },
                { status: 404 },
            );
        }
        const { id, phoneNumber, fullName, balance, createdAt, updatedAt } =
            user;

        return NextResponse.json(
            {
                message: "Get user successfully.",
                data: {
                    id,
                    phoneNumber,
                    fullName,
                    balance,
                    createdAt,
                    updatedAt,
                },
            },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "Internal server error. Please try again later.",
            },
            { status: 500 },
        );
    }
}

export async function PATCH(request: NextRequest) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json(
            { message: "Invalid or expired access token." },
            { status: 401 },
        );
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found or unauthorized." },
                { status: 404 },
            );
        }
        const body = await request.json();
        const { phoneNumber, fullName } = body;

        if (!phoneNumber || !fullName) {
            return NextResponse.json(
                { message: "All fields are required!" },
                { status: 400 },
            );
        }

        // validation phoneNumber
        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
        if (!phoneRegex.test(phoneNumber)) {
            return NextResponse.json(
                { message: "Invalid phone number!" },
                { status: 400 },
            );
        }

        // Check if the phone number already exists.
        const existingPhone = await prisma.user.findFirst({
            where: { phoneNumber: phoneNumber, NOT: { id: userId } },
        });

        if (existingPhone) {
            return NextResponse.json(
                {
                    message: "The phone number already exists.",
                },
                { status: 400 },
            );
        }

        const newUser = await prisma.user.update({
            where: { id: userId },
            data: {
                fullName,
                phoneNumber,
            },
        });

        const {
            id,
            phoneNumber: phone,
            fullName: name,
            balance,
            createdAt,
            updatedAt,
        } = newUser;

        return NextResponse.json(
            {
                message: "User information changed successfully.",
                data: {
                    id,
                    phoneNumber: phone,
                    fullName: name,
                    balance,
                    createdAt,
                    updatedAt,
                },
            },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "Internal server error. Please try again later.",
            },
            { status: 500 },
        );
    }
}
