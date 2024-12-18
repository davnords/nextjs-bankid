'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useStormAuthContext } from "@/hooks/use-storm-auth-context";
import { CircularProgress } from "@mui/material";


export function MontoAI() {
  const router = useRouter()
  const { isAuthenticated, session, logOut, logIn, loading } = useStormAuthContext()

  if (loading) {
    return (
      <>
        <div className='flex justify-center items-center align-middle h-screen'>
          <CircularProgress />
        </div>
      </>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#1a1a2e]">
        <div className="flex w-full max-w-md flex-col rounded-lg bg-white p-8 text-center shadow-lg space-y-4">

          <img
            className="mb-4"
            style={{ maxHeight: 100, maxWidth: 100 }}
            src="https://images.teamtailor-cdn.com/images/s3/teamtailor-production/gallery_picture-v6/image_uploads/0f5368b1-99cd-483b-9e0b-7f955de88c24/original.png" />
        <span className="text-xl font-semibold">You are logged in to Monto</span>
        <Button onClick={logOut} className="bg-[#6c63ff] text-white">Log out</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#1a1a2e]">
      <div className="flex w-full max-w-md flex-col rounded-lg bg-white p-8 text-center shadow-lg">
        <div className="mb-4 flex justify-between">
          <img
            style={{ maxHeight: 100, maxWidth: 100 }}
            src="https://images.teamtailor-cdn.com/images/s3/teamtailor-production/gallery_picture-v6/image_uploads/0f5368b1-99cd-483b-9e0b-7f955de88c24/original.png" />
          <div className="flex items-center">
            <img
              alt="Flag"
              className="mr-1 h-6 w-6"
              height="24"
              src="https://vectorflags.s3.amazonaws.com/flags/uk-circle-01.png"
              style={{
                aspectRatio: "24/24",
                objectFit: "cover",
              }}
              width="24"
            />
            <ChevronDownIcon className="h-4 w-4 text-[#0f3460]" />
          </div>
        </div>
        <h2 className="mb-3 text-xl font-semibold text-[#0f3460]">Sign in to Monto</h2>
        <h2 className="mb-3 font-semibold text-gray-500">Use username and password...</h2>
        <form className="mb-3 flex w-full flex-col">
          <label className="mb-2 text-left text-sm font-medium text-[#0f3460]" htmlFor="account-name">
            Account name
          </label>
          <Input className="mb-4" id="account-name" placeholder="Account name" />
          <Button className="bg-[#6c63ff] text-white w-full">Continue</Button>
        </form>
        <h2 className="mb-3 font-semibold text-gray-500">...or authenticate with Storm</h2>
        <Button onClick={() => router.push('/auth?redirectURL=/monto')} className="bg-gray-700 text-white w-full">Redirect to Storm</Button>
      </div>
    </div>
  )
}


function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
