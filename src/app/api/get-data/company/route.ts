import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const companyName = searchParams.get('companyName')
    if (!companyName) {
        return NextResponse.json('Company name is required', {
            status: 400,
        })
    }
    try {
        const company = await prisma.company.findUnique({ where: { name: companyName }, include: { serviceProviders: true, teams: { include: { users: true, serviceProviders: true } }, endUsers: { include: { serviceProviders: true, sessions: { include: { geo: true } } } } } })
        return NextResponse.json({ company: company }, { status: 200 })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json(error, { status: 400 })
    }
}   