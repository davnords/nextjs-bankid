import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { TypewriterEffect } from './ui/typewriter'

const words = [
    {
        text: "Sign",
    },
    {
        text: "in",
    },
    {
        text: "with",
    },
    {
        text: "Storm.io.",
        className: "text-blue-500 dark:text-blue-500",
    }
]

type Method = 'BankID' | 'Google' | 'Github'

function LoginPageComponent({ providerName, bankIdSignInMethod, auth }: { providerName: string, bankIdSignInMethod: (arg0: 'sd' | 'dd' | null) => void, auth: (arg0: string) => void }) {
    const [signInMethod, setSignInMethod] = useState<Method | null>(null)
    return (
        <>
            <TypewriterEffect words={words} />
            {signInMethod === 'BankID' ?
                <div className="mt-6">
                    <div className="mt-6">
                        <Button className="w-full bg-blue-500 text-white hover:bg-blue-700" onClick={() => {
                            bankIdSignInMethod('sd')
                            auth('sd')
                        }}>
                            <span>
                                Bank ID på samma enhet
                            </span>
                            <Image
                                className='ml-auto'
                                src="/images/BankID_logo_white.svg"
                                width={50}
                                height={50}
                                alt="BankID logo"
                            />
                        </Button>
                    </div>
                    <div className="mt-6">
                        <Button className="w-full outline outline-1 outline-gray-400 bg-white text-black hover:bg-gray-200" onClick={() => {
                            bankIdSignInMethod('dd')
                            auth('dd')
                        }}>
                            <span>
                                Bank ID på annan enhet
                            </span>
                            <Image
                                className='ml-auto'
                                src="/images/BankID_logo.svg"
                                width={50}
                                height={50}
                                alt="BankID logo"
                            />
                        </Button>
                    </div>
                </div> :
                <>
                    <div className='mt-3 flex flex-row space-x-4 items-center justify-center'>
                        <span className='text-sm text-gray-500'>
                            Use an international auth provider...
                        </span>
                    </div>

                    <div className='mt-6 flex flex-row space-x-4 items-center justify-center' >
                        <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>

                        <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>

                        <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23"><path fill="#f3f3f3" d="M0 0h23v23H0z" /><path fill="#f35325" d="M1 1h10v10H1z" /><path fill="#81bc06" d="M12 1h10v10H12z" /><path fill="#05a6f0" d="M1 12h10v10H1z" /><path fill="#ffba08" d="M12 12h10v10H12z" /></svg>
                    </div>

                    <div className='mt-3 flex flex-row space-x-4 items-center justify-center'>
                        <span className='text-sm text-gray-500'>
                            ...or use your national ID system
                        </span>
                    </div>
                    <div className='mt-3 flex flex-row items-center justify-center'>
                        <button onClick={() => setSignInMethod('BankID')} className="mt-3 h-12 w-4/5 animate-shimmer flex flex-row items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#0f172a,45%,#1e2631,55%,#0f172a)] bg-[length:200%_100%] px-6 text-xs md:text-sm text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:text-slate-400">
                            <span>
                                Use BankID
                            </span>
                            <Image
                                height={50}
                                width={50}
                                className='ml-auto'
                                src="/images/BankID_logo_white.svg"
                                alt="BankID logo"
                            />
                        </button>
                    </div>
                </>
            }
            <div className='mt-6'>


                {!signInMethod &&
                    <div className="text-center text-xs md:text-sm text-gray-500">
                        By signing in, I agree to{" "}
                        <a className="text-blue-500 hover:underline" href="#">
                            Terms
                        </a>{" "}
                        and{" "}
                        <a className="text-blue-500 hover:underline" href="#">
                            Privacy Policy
                        </a>
                    </div>
                }
                <div className="mt-1 text-center text-xs md:text-sm text-gray-500">
                    Powered by {" "}
                    <a className="text-blue-500 hover:underline" href="#">
                        StormAuth
                    </a>
                </div>
            </div>
        </>
    )
}

export default LoginPageComponent