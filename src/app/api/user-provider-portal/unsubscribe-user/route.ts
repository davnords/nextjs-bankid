import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"

export async function POST(req: NextRequest) {
    const json = await req.json()
    const { userId, companyId } = json
    try {
        const user = await prisma.endUser.update({
            where: {
                id: userId
            },
            data: {
                serviceProviders: {
                    disconnect: {
                        id: companyId
                    }

                }
            }
        })
        return NextResponse.json({ user }, { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })

    }


}