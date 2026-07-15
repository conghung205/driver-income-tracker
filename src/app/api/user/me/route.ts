import prisma from "@/lib/prisma";
import { updateUserSchema } from "@/validations/user.schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const result = updateUserSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { message: result.error.issues[0].message },
                { status: 400 },
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found or unauthorized." },
                { status: 404 },
            );
        }

        const { phoneNumber, fullName } = result.data;
        const dataToUpdate: {
            fullName?: string;
            phoneNumber?: string;
        } = {};

        if (fullName !== undefined) {
            dataToUpdate.fullName = fullName;
        }

        if (phoneNumber !== undefined) {
            const existingPhone = await prisma.user.findFirst({
                where: {
                    phoneNumber,
                    NOT: { id: userId },
                },
            });

            if (existingPhone) {
                return NextResponse.json(
                    {
                        message: "The phone number already exists.",
                    },
                    { status: 400 },
                );
            }
            dataToUpdate.phoneNumber = phoneNumber;
        }

        const newUser = await prisma.user.update({
            where: { id: userId },
            data: dataToUpdate,
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
