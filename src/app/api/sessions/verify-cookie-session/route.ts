import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"
import jwt from 'jsonwebtoken'
import { SessionPayloadProps } from "@/models/session"
import { cookies as cookieHeader } from 'next/headers'


export async function GET(req: NextRequest) {
    const { cookies } = req;
    const token = cookies.get('storm-auth.session-token')?.value;


    if (!process.env.JWT_SECRET) {
        return NextResponse.json('Necessary field missing', {
            status: 400,
        })
    }

    if (!token) {
        return NextResponse.json({ session: undefined }, {
            status: 200,
        })
    }

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET) as SessionPayloadProps

        // Get the expiration date from the payload
        const expirationDate = new Date(decodeToken.expiresAt);

        // Get the current date
        const currentDate = new Date();

        if (expirationDate > currentDate) {
            const session = await prisma.session.findUnique({ where: { token: token } })
            if (session?.status === 'ACTIVE') {
                return NextResponse.json({ session: session }, {
                    status: 200,
                })
            } else {
                // if it is an inactive session, delete the cookie
                cookieHeader().delete('storm-auth.session-token')

                return NextResponse.json({ session: undefined }, {
                    status: 200,
                })
            }


        }

        // if not a real session, remove it 
        cookieHeader().delete('storm-auth.session-token')

        return NextResponse.json({ session: undefined }, {
            status: 200,
        })

    } catch (error) {
        return NextResponse.json({ session: undefined }, {
            status: 400,
        })
    }


}   