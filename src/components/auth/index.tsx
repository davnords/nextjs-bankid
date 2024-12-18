"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react"
import { AuthResponse, OrderStatus, CompletionData, CollectResponse } from "@/models/bank-id-login"
import { useStormAuthContext } from '@/hooks/use-storm-auth-context';
import SuccessfulLoginComponent from "./successful-login"
import LoginPageComponent from "./login-page"
import LoadingComponent from "./loading"
import ScanQRComponent from "./scan-qr"
import OpenAppOnPhoneComponent from "./open-app-on-phone"
import { Meteors } from "./ui/meteors"
import { Loader } from "./ui/loader"

const crypto = require("crypto");

export default function AuthLoginComponent({ providerName }: { providerName: string }) {

    const searchParams = useSearchParams()
    const callbackURL = searchParams.get('redirectURL')

    const [qrCode, setQrCode] = useState<string | null>(null)
    const [fetchLoading, setFetchLoading] = useState(false)
    const [orderTime, setOrderTime] = useState<number | null>(null)
    const [authResponse, setAuthResponse] = useState<AuthResponse | null>(null)
    const [signInMethod, setSignInMethod] = useState<'sd' | 'dd' | null>(null) // same device or different device
    const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null)
    const [completionData, setCompletionData] = useState<CompletionData | null>(null)

    const [bankIdOpenLink, setBankIdOpenLink] = useState<string | null>(null)

    const router = useRouter()

    const { isAuthenticated, session, logOut, logIn, loading } = useStormAuthContext()


    async function auth(method: string) {
        setFetchLoading(true)
        const response = await fetch(`/api/auth`, {
            method: 'post',
        })

        if (response.status === 200) {
            const auth: AuthResponse = await response.json()
            setAuthResponse(auth)

            if (method === 'sd') {
                const redirectURL = encodeURIComponent(`${process.env.NEXT_PUBLIC_HOST_URL}/${callbackURL}`); // Replace with your redirect URL

                // Construct the BankID URL
                const bankIDURL = `https://app.bankid.com/?autostarttoken=${auth.autoStartToken}&redirect=${redirectURL}`;

                setBankIdOpenLink(bankIDURL) // preferably just use router and open it in new window without click
            } else {
                const qr_start_token = auth.qrStartToken;
                const qr_start_secret = auth.qrStartSecret;
                const order_time = Math.floor(Date.now() / 1000); // Current time in seconds
                setOrderTime(order_time)

                const qr_time = (Math.floor(Date.now() / 1000) - order_time).toString();

                const hmac = crypto.createHmac('sha256', qr_start_secret);
                hmac.update(qr_time);
                const qr_auth_code = hmac.digest('hex');

                const qr_data = `bankid.${qr_start_token}.${qr_time}.${qr_auth_code}`;

                console.log('QR Auth Code:', qr_auth_code);
                console.log('QR Data:', qr_data);
                setQrCode(qr_data)
            }
        }
        setFetchLoading(false)
    }


    const updateQRCode = async () => {
        if (orderStatus === 'complete' || !signInMethod) {
            return
        }

        if (authResponse) {
            const response = await fetch(`/api/collect`, {
                method: 'post',
                body: JSON.stringify({ orderRef: authResponse.orderRef })
            })
            if (response.status === 200) {
                const collect: CollectResponse = await response.json()
                if (collect.hintCode === 'userSign') {
                    setOrderStatus('userSign')
                } else if (collect.status === 'complete' && collect.completionData) {
                    setOrderStatus(collect.status)
                    setCompletionData(collect.completionData)
                    if (logIn) {
                        await logIn(collect.completionData.user.name, collect.completionData.user.surname, collect.completionData.user.personalNumber, "Dagens Industri", callbackURL ?? '/di-example') // add identifier to login that connects to NREP
                    }
                }
                else {
                    setOrderStatus(collect.status)
                }
            }
        }

        if (orderTime && authResponse) {
            const qr_start_token = authResponse.qrStartToken
            const qr_start_secret = authResponse.qrStartSecret
            const qr_time = (Math.floor(Date.now() / 1000) - orderTime).toString();

            const hmac = crypto.createHmac('sha256', qr_start_secret);
            hmac.update(qr_time);
            const qr_auth_code = hmac.digest('hex');
            const qr_data = `bankid.${qr_start_token}.${qr_time}.${qr_auth_code}`;
            setQrCode(qr_data);
        }
    };

    useEffect(() => {
        // Set interval to update QR code data every second
        const interval = setInterval(updateQRCode, 1000);

        if (!signInMethod || orderStatus === 'complete') {
            clearInterval(interval); // Clear interval on component unmount
        }

        return () => {
            clearInterval(interval); // Clear interval on component unmount
        };

    }, [qrCode, bankIdOpenLink]); // Run effect whenever qrCode changes
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center">
            <div className="hidden md:block">
                <Meteors number={20} />
            </div>
            <div className="mx-auto w-3/4 md:w-full max-w-md px-8 py-10 bg-white shadow-lg rounded-xl mt-3 md:mt-10 overflow-hidden z-[1]">
                {signInMethod ?
                    <>
                        {orderStatus === 'complete' && completionData ?
                            <SuccessfulLoginComponent redirectURL={callbackURL ?? '/di-example'} />
                            : orderStatus === "userSign" ?
                                <LoadingComponent /> : qrCode ?
                                    <ScanQRComponent qrCode={qrCode} setSignInMethod={setSignInMethod} />
                                    : bankIdOpenLink ?
                                        <OpenAppOnPhoneComponent bankIdOpenLink={bankIdOpenLink} loading={loading} setSignInMethod={setSignInMethod} setBankIdOpenLink={setBankIdOpenLink} />
                                        :
                                        <div className="flex justify-center">
                                            <Loader />
                                        </div>
                        }
                    </>
                    : <LoginPageComponent providerName={providerName} bankIdSignInMethod={setSignInMethod} auth={auth} />
                }
            </div>
        </div>
    )
}
