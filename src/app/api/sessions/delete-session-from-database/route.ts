import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"

export async function POST(req: NextRequest) {
    const { token } = await req.json();

    if (!token) {
        return NextResponse.json('No token, cannot delete session', {
            status: 400,
        })
    }
    try {
        await prisma.session.delete({
            where: { token: token }
        })
        return NextResponse.json('success', { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 400 })
    }


}