import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const isSubpathToProtectedPath = pathname.startsWith("/portal");
    const isLoginPath = pathname.startsWith("/portal/login");
    const res = NextResponse.next();
    const { cookies } = req;
    const session = cookies.get('sessionToken')?.value;

    if (isSubpathToProtectedPath && !isLoginPath) {
        if (!session) {
            const url = new URL(`/portal/login`, req.url);
            url.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(url);
        }
    } else if (isLoginPath) {
        if (session) {
            const url = new URL(`/portal`, req.url);
            return NextResponse.redirect(url);
        }
    }

    return res;
}
