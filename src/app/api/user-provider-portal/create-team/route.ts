import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"

export async function POST(req: NextRequest) {
    const json = await req.json()
    const { userIds, companyName, teamName, providerIds } = json

    try {
        const team = await prisma.team.create({
            data: {
                name: teamName,
                Company: {
                    connect: {
                        name: companyName
                    }
                },
                users: {
                    connect: userIds.map((id: string) => ({ id: id }))
                },
                serviceProviders: {
                    connect: providerIds.map((id: string) => ({ id: id }))
                }
            }
        })

        return NextResponse.json('success', { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })

    }


}