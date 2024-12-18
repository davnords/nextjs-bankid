import { NextResponse, NextRequest } from "next/server"
import { cookies } from 'next/headers'


export async function GET(req: NextRequest) {
    cookies().delete('sessionToken')
    return NextResponse.json('success')
}   