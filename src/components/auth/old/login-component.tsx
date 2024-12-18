'use client'
import { useState, useEffect } from 'react';
import QRCode from "react-qr-code";
const crypto = require("crypto");
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, CircularProgress, LinearProgress } from '@mui/material';
import { useRouter } from 'next/navigation'
import { useStormAuthContext } from '@/hooks/use-storm-auth-context';
import Image from 'next/image'

interface AuthResponse {
  orderRef: string;
  autoStartToken: string;
  qrStartToken: string;
  qrStartSecret: string;
}
type OrderStatus = 'pending' | 'complete' | 'failed' | 'userSign';

interface CompletionData {
  user: {
    personalNumber: string;
    name: string;
    givenName: string;
    surname: string;
  }
  device: {
    ipAddress: string;
    uhi: string;
  }
  bankIdIssueDate: string;
  signature: string;

}

interface CollectResponse {
  orderRef: string;
  status: OrderStatus;
  completionData?: CompletionData;
  hintCode?: string;
}

export function LoginComponent() {
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
        const redirectURL = encodeURIComponent(`${process.env.NEXT_PUBLIC_HOST_URL}/di-example`); // Replace with your redirect URL

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
            await logIn(collect.completionData.user.name, collect.completionData.user.surname, collect.completionData.user.personalNumber, "Dagens Industri", '/di-example') // add identifier to login that connects to NREP
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
    <div className="pt-4 pb-4">
      <Card className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="text-white bg-blue-300">
          <div className="flex flex-col items-center py-8">
            <img
              alt="Company Logo"
              className="w-52"
              src="/logos/storm-logo-no-bg (1).png"
              style={{
                aspectRatio: "auto",
                objectFit: "cover",
              }}
            />
            <CardTitle className="text-2xl text-center mt-4">Welcome to our login system</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-8">
          <>
            {qrCode && signInMethod &&
              <>
                {orderStatus === 'userSign' ?
                  <LinearProgress className='w-full' color='info' /> :
                  orderStatus === 'complete' && completionData ?
                    <>
                      <Alert severity="success">Login successful. You will be redirected shortly. Please press the button below if nothing happens.</Alert>
                      <CircularProgress size={20} />
                    </>
                    :
                    <div className="mt-4 relative w-40 h-40">
                      <QRCode
                        className="w-full h-full"
                        value={qrCode}
                      />
                    </div>
                }
              </>
            }
            {orderStatus === 'complete' && completionData ?
              <Button className="w-full bg-green-300 hover:bg-green-400 text-white" onClick={() => router.push('/di-example')}>Finish login</Button>
              : <>
                {!signInMethod ?
                  <>
                    <div className='space-y-4'>
                      <Button className="w-full bg-[#0092e1] hover:bg-blue-700 text-white" onClick={() => {
                        setSignInMethod('sd')
                        auth('sd')
                      }}>
                        <span>
                          Bank ID på samma enhet
                        </span>
                        <Image
                          className='ml-auto'
                          src="/images/bank-id-logo-white.png"
                          width={30}
                          height={30}
                          alt="BankID logo"
                        />
                      </Button>
                      <Button className="outline outline-1 outline-gray-400 w-full bg-white hover:bg-gray-100 text-black" onClick={() => {
                        setSignInMethod('dd')
                        auth('dd')
                      }}>
                        <span>
                          Bank ID på annan enhet
                        </span>
                        <Image
                          className='ml-auto'
                          src="/images/bank-id-logo.png"
                          width={30}
                          height={30}
                          alt="BankID logo"
                        />

                      </Button>
                    </div>
                  </> :

                  <>
                    {fetchLoading && <CircularProgress className='mb-4' size={20} />}
                    {bankIdOpenLink &&
                      <a href={bankIdOpenLink} className='w-full' target="_blank">
                        <Button typeof='submit' disabled={loading} className="w-full bg-gray-900 hover:bg-black text-white" type="submit">
                         Open app
                        </Button>
                      </a>}
                    <Button className="w-full bg-gray-500 hover:bg-gray-700 text-white mt-4" onClick={() => {
                      setSignInMethod(null)
                      setQrCode(null)
                    }}>Back</Button>
                  </>
                }
              </>
            }
          </>
        </CardContent>
      </Card>
    </div>
  )
}
