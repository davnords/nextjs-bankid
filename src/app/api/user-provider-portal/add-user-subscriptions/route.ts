import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"
import { OnboardEmployeeInputs } from "@/models/onboard-employee"

export async function POST(req: NextRequest) {
    const json = await req.json()
    const { userIds, providerId } = json

    try {
        userIds.map(async (id: string) => {
            await prisma.endUser.update({
                where: { id: id },
                data: {
                    serviceProviders: {
                        connect: {
                            id: providerId,
                        },
                    },
                },
            });
        })
        return NextResponse.json('success', { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })

    }


}