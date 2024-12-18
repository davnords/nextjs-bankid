import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"
import jwt from 'jsonwebtoken'


export async function POST(req: NextRequest) {
    const json = await req.json()
    const { serviceProviderName, companyName } = json
    if (!serviceProviderName || !companyName) {
        return NextResponse.json('Necessary field missing', {
            status: 400,
        })
    }

    if (!process.env.JWT_SECRET) {
        return NextResponse.json('No secret key was found in .env', {
            status: 400,
        })
    }

    const payload = {
        serviceProviderName: serviceProviderName,
        companyName: companyName,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET) // potential to add expiry
    return NextResponse.json({ token }, { status: 200 })
}