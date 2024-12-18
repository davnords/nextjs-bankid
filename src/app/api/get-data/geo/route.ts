import { NextResponse, NextRequest } from "next/server"
// Need to add refresh tokens also

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function GET(req: NextRequest) {
    if(req.geo?.city){
        return NextResponse.json(req.geo, { status: 200 })
    }
    return NextResponse.json('Not found', { status: 413 })
    
}