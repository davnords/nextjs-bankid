import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"

export async function POST(req: NextRequest) {
    const json = await req.json()
    const { id, companyName } = json
    try {
        const company = await prisma.company.update({
            where: { name: companyName }, data: {
                serviceProviders: {
                    disconnect: {
                        id: id,
                    }
                }
            }
        })
        return NextResponse.json({ company }, { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })

    }


}