import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const providerName = searchParams.get('providerName')
    if (!providerName) {
        return NextResponse.json('Provider name is required', {
            status: 400,
        })
    }
    try {
        const companies = await prisma.company.findMany({
            where: { serviceProviders: { some: { name: providerName } } },
            include: {
                endUsers: {
                    include: {
                        sessions: true
                    }
                }
            }
        })
        return NextResponse.json({ companies: companies }, { status: 200 })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json(error, { status: 400 })
    }
}   