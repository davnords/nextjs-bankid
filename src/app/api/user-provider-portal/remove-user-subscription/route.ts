import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"

export async function POST(req: NextRequest) {
    const json = await req.json()
    const { userId, providerId } = json

    try {
        await prisma.endUser.update({
            where: { id: userId },
            data: {
                serviceProviders: {
                    disconnect: {
                        id: providerId,
                    },
                },
            },
        });
        return NextResponse.json('success', { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })

    }


}