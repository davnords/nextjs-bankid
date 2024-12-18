import { NextResponse, NextRequest } from "next/server"
import { cookies } from 'next/headers'


export async function GET(req: NextRequest) {

    const expirationDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))

    // No cookie validation or signing (i.e. this is not safe)
    // Set the generated token in a cookie
    cookies().set({
        name: 'sessionToken',
        value: crypto.randomUUID(),
        httpOnly: true,
        path: '/',
        expires: expirationDate,
        secure: true
    })

    return NextResponse.json('success')
}   