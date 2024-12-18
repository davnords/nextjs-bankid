import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"
import jwt from 'jsonwebtoken'
import { PortalSessionPayloadProps, SessionPayloadProps } from "@/models/session"
import { cookies as cookieHeader } from 'next/headers'


export async function GET(req: NextRequest) {
    const { cookies } = req;
    const token = cookies.get('sessionToken')?.value;


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
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET) as PortalSessionPayloadProps

        // Get the expiration date from the payload
        const expirationDate = new Date(decodeToken.expiresAt);

        // Get the current date
        const currentDate = new Date();

        if (expirationDate > currentDate) {

            return NextResponse.json({ payload: decodeToken }, {
                status: 200
            })
        }
        else {
            // if it is an inactive session, delete the cookie
            cookieHeader().delete('sessionToken')
            return NextResponse.json('session expired', {
                status: 413,
            })
        }

    } catch (error) {
        return NextResponse.json({ session: undefined }, {
            status: 400,
        })
    }


}   