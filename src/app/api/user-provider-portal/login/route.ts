import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"
import bcrypt from 'bcrypt'
import { PortalSessionPayloadProps } from "@/models/session"
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const username = searchParams.get('username')
    const password = searchParams.get('password')
    if (!username || !password || !process.env.JWT_SECRET) {
        return NextResponse.json('Required fields missing', {
            status: 400,
        })
    }
    try {
        const account = await prisma.portalAccount.findUnique({
            where: {
                username
            },
            include: {
                password: true,
                user: true
            }
        })

        if (!account || !account?.password?.hash) {
            return NextResponse.json('Error: No user found', { status: 404 })
        }

        const passwordMatch = await bcrypt.compare(password, account.password.hash);

        if (passwordMatch) {

            const today = new Date()

            const expirationDate = new Date(today.setFullYear(today.getFullYear() + 1))

            const payload = {
                name: account.user?.name,
                image: account.user?.image,
                username: account.username,
                role: account.user?.role,
                expiresAt: expirationDate,
            } as PortalSessionPayloadProps

            const token = jwt.sign(payload, process.env.JWT_SECRET) // potential to add expiry

            cookies().set({
                name: 'sessionToken',
                value: token,
                httpOnly: true,
                path: '/',
                expires: expirationDate,
                secure: true
            })

            return NextResponse.json({ payload }, { status: 200 })
        } else {
            return NextResponse.json('Invalid credentials', { status: 401 })
        }
    } catch (error: any) {
        console.log(error)
        return NextResponse.json(error, { status: 400 })
    }
}   