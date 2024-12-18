import { NextResponse, NextRequest } from "next/server"

import { BankIdClient } from "@/lib/bank-id";

export async function POST(req: NextRequest) {
    const date = new Date()
    const client = new BankIdClient({
        production: false,
        passphrase: "qwerty123",
    });

    // Set appropriate headers to prevent caching
    const headers = {
        "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
        "Last-Modified": date.toUTCString(),
        // Add other necessary headers if needed
    };

    try {
        const response = await client.authenticate({
            endUserIp: req.ip ?? "127.0.0.1",
        })
        return NextResponse.json(response, {
            status: 200,
            headers: headers
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 500, })

    }
}