import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"

export async function POST(req: NextRequest) {
    const json = await req.json()
    const { userId } = json
    try {
        const user = await prisma.endUser.delete({ where: { id: userId } })
        return NextResponse.json({ user }, { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })

    }


}