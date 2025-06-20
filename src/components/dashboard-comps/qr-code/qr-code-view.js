"use client"

import { useRef, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { IoClose } from "react-icons/io5"
import QRCodeStyling from "qr-code-styling"
import { useAppContext } from "@/context/app-context"

const QRCodeDetailsPanel = ({ onClose = () => {} }) => {
  
  
  /* --- vars -------------------------------------------------------- */
  const statusColor = {
    active: "bg-green-500/20 text-green-600",
    paused: "bg-yellow-400/20 text-yellow-600",
  };

  const {user, selectedCode, activatePanel, changeQrStatus, destroyQrCode} = useAppContext()
  const qrInstanceRef  = useRef(null)  // holds the QRCodeStyling object
  const containerRef   = useRef(null)  // holds the div we render into
  /* --------------------------------------------------------------------- */

  /* ---- destructure with fallbacks ------------------------------------- */
  const {
    slug   = "qr-code",
    target = "https://example.com",
    dynamic = false,
    design = {},
    stats  = {},
  } = selectedCode ?? {}

  const {
    color    = "#FF312E",
    size     = 256,
    dotShape = "square",
    logoUrl  = "",
  } = design

  const { totalScans = 0, lastScanAt = null } = stats
  /* --------------------------------------------------------------------- */

  
  /* ---- handlers ------------------------------------------------------- */
  const handleDownload = () => {
    const qr = qrInstanceRef.current
    if (!qr || typeof qr.download !== "function") return
    qr.download({ name: slug, extension: "png", scale: 4 })
  }

  const handleClose = () => activatePanel("qr-codes")

  const handleClick = async() => {
    destroyQrCode()
  }

  const handleStatusChange = async(value) => {
    changeQrStatus(value)
  }
  /* --------------------------------------------------------------------- */


  /* ---- create / update the QR instance -------------------------------- */
  useEffect(() => {

    // create once
    if (!qrInstanceRef.current) {
      qrInstanceRef.current = new QRCodeStyling({
        width: size,
        height: size,
        data: [process.env.NEXT_PUBLIC_BASE_URL,`api/handle-qr-scan?username=${user.username}&slug=${slug}`].join('/'),
        image: logoUrl || undefined,
        dotsOptions: { color, type: dotShape },
        backgroundOptions: { color: "white" },
        imageOptions: { crossOrigin: "anonymous", margin: 10 },
      })
      qrInstanceRef.current.append(containerRef.current)
    }

    // update on prop changes
    qrInstanceRef.current.update({
      data: [process.env.NEXT_PUBLIC_BASE_URL,`api/handle-qr-scan?username=${user.username}&slug=${slug}`].join('/'),
      dotsOptions: { color, type: dotShape },
      image: logoUrl || undefined,
    })
  }, [target, color, dotShape, logoUrl, size])
  /* --------------------------------------------------------------------- */

  

  return (
    <div className="flex-1 flex items-center justify-center">
      <Card className="w-full max-w-xl bg-card text-white shadow-xl rounded-2xl p-4">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="w-full flex items-center">
            <span className="text-xl mr-auto">QR Code Details</span>

            <Button size="sm" variant="outline" className="gap-1" onClick={handleDownload}>
              <Download className="h-4 w-4" /> Download
            </Button>

            <Button variant="ghost" onClick={handleClose}
            className='mx-2'
            >
              <IoClose />
            </Button>

            
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="w-fit mx-auto flex justify-center bg-white">
            <div ref={containerRef} /> {/* <-- QR renders here */}
          </div>

          <div className="space-y-2 text-sm">
            <p><span className="font-medium text-[#BBB8B2]">Slug:</span> {slug}</p>
            <p><span className="font-medium text-[#BBB8B2]">Target URL:</span> {target}</p>
            <p><span className="font-medium text-[#BBB8B2]">Dynamic:</span> {dynamic ? "Yes" : "No"}</p>
            <p><span className="font-medium text-[#BBB8B2]">Total Scans:</span> {totalScans}</p>
            <p><span className="font-medium text-[#BBB8B2]">Last Scanned:</span> {lastScanAt ? new Date(lastScanAt).toLocaleString() : "Never"}</p>
          </div>
        
          <div className='flex'
          >
            {
              Object.keys(statusColor).map((key,index) => {

                return(
                  <div key={'status-'+index}
                  className={
                    'flex border hover:border-white rounded-lg mx-2 '+
                    (selectedCode.status === key ? ' border-white' : 'border-transparent')
                  }

                  onClick={() => {handleStatusChange(key)}}
                  >
                    <div
                    className={
                      `flex flex-col items-center justify-center gap-2 text-center cursor-pointer ${statusColor[key]} `+
                      'rounded-md px-2 py-1'
                    }
                    >
                      {key}                    
                    </div>
                  </div>
                )
              })
            }
          </div>
        
        </CardContent>

        <CardFooter >
          <Button variant="outline" 
          className='bg-primary  w-full'

          onClick={handleClick}
          >
            Destroy QR Code
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default QRCodeDetailsPanel
