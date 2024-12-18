import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"

export async function GET(req: NextRequest) {
    try {
        const serviceProviders = await prisma.serviceProvider.findMany()
        return NextResponse.json({ serviceProviders: serviceProviders }, { status: 200 })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json(error, { status: 400 })
    }
}   