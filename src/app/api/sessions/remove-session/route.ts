import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"
import { cookies as cookieHeader } from 'next/headers'

// Need to add refresh tokens also
// This does not delete the session but indeed just makes it inactive

export async function POST(req: NextRequest) {
    const { cookies } = req;
    const token = cookies.get('storm-auth.session-token')?.value;

    if (!token) {
        return NextResponse.json('No token, no need to log out', {
            status: 400,
        })
    }
    try {
        cookieHeader().delete('storm-auth.session-token')
        await prisma.session.update({
            where: { token: token }, data: {
                status: 'INACTIVE'
            }
        })
        return NextResponse.json('success', { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }


}