import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"

export async function POST(req: NextRequest) {
    const json = await req.json()
    const { teamId } = json

    try {
        const team = await prisma.team.delete({
            where: {
                id: teamId
            }
        })

        return NextResponse.json('success', { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })

    }


}