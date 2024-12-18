import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"
import jwt from 'jsonwebtoken'
import { SessionPayloadProps } from "@/models/session"
import { cookies } from 'next/headers'


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token || !process.env.JWT_SECRET) {
        return NextResponse.json('Necessary field missing', {
            status: 400,
        })
    }

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET) as SessionPayloadProps

        // Get the expiration date from the payload
        const expirationDate = new Date(decodeToken.expiresAt);

        // Get the current date
        const currentDate = new Date();

        if (expirationDate>currentDate) {
            console
            const session = await prisma.session.findUnique({ where: { token: token } })
            return NextResponse.json({ session: session }, {
                status: 200,
            })

        }

        // if not a real session, remove it 
        cookies().delete('storm-auth.session-token')

        return NextResponse.json({ session: undefined }, {
            status: 200,
        })

    } catch (error) {
        return NextResponse.json({ session: undefined }, {
            status: 400,
        })
    }


}   