import { useEffect, useRef, useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import QRCodeStyling from 'qr-code-styling'
import { formToQRCodeDoc } from '@/helper-functions/qr-to-object'
import { useAppContext } from '@/context/app-context'
import { useRouter } from 'next/router'











const CreateQRCodeSection = () => {

  const qrRef = useRef(null)
  const qrInstance = useRef(null)
  const {user,activatePanel,createQrCode,checkSlugExists} = useAppContext()
  const [slugExists,setSlugExists] = useState()
  const timeoutRef = useRef(null);
  
  const DOT_STYLES = [
    'rounded',
    'dots',
    'square',
    'classy',
    'classy-rounded',
  ]

  const [form, setForm] = useState({
    slug: '',
    target: '',
    color: '#383838',
    size: 256,
    dynamic: true,
    logo: null, // File object
    dotStyle: 'rounded',
    shape: 'square', // or 'circle'
  })

  
  

  //  ██╗ ██╗  ██╗ ██╗  ██╗ ██╗ 
  // ████████╗████████╗████████╗
  // ╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝
  // ████████╗████████╗████████╗
  // ╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝
  //  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝ 
                             

  // ---------- helpers ----------
  const handleChange = (key) => (e) => {
    const value = e?.target ? e.target.value : e
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) setForm((prev) => ({ ...prev, logo: file }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    if (form.slug && form.target && !slugExists) {
      activatePanel('loading')
      const qrData = formToQRCodeDoc(form, user.sub)
      
      

      if (qrData) {

        const data = {
          ownerId:user.sub,
          qrData
        }

        const response = createQrCode(data)

        if (response) {
          setTimeout(() => {
            location.reload()
          }, 2000);
        }

      } else {
        console.log('Error creating QR code')
      }
      

    }
  }


  const checkSlug = async() => {
    
    const data = {
      slug:form.slug,
      ownerId:user.sub,
    }

    const response = await checkSlugExists(data)
    if (response) {
      setSlugExists(response.slugExists)
    }
  }
  

  const getFullTarget = () => {
    const result = [process.env.NEXT_PUBLIC_BASE_URL,`api/handle-qr-scan?username=${user.username}&slug=${form.slug}`].join('/')
    return result
  }


  


  //  ██╗ ██╗  ██╗ ██╗  ██╗ ██╗  ██╗ ██╗  ██╗ ██╗ 
  // ████████╗████████╗████████╗████████╗████████╗
  // ╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝
  // ████████╗████████╗████████╗████████╗████████╗
  // ╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝
  //  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝ 
   

  useEffect(() => {
    if (form.slug) {
      clearTimeout(timeoutRef.current);
      
      timeoutRef.current = setTimeout(() => {
        if (form.slug.trim()) {
          checkSlug(form.slug); // put your async validation here
        }
      }, 500);

      return () => clearTimeout(timeoutRef.current);
    }
  }, [form.slug]);
  
  // ---------- init + update QR ----------
  useEffect(() => {
    if (!qrInstance.current) {
      qrInstance.current = new QRCodeStyling({
        width: form.size,
        height: form.size,
        type: 'canvas',
        data: getFullTarget(),
        qrOptions: { errorCorrectionLevel: 'H' },
        dotsOptions: { color: form.color, type: form.dotStyle },
        backgroundOptions: { color: '#FFFFFF' },
        imageOptions: { crossOrigin: 'anonymous', margin: 4 },
      })
      qrInstance.current.append(qrRef.current)
    }

    const reader = form.logo ? URL.createObjectURL(form.logo) : undefined

    qrInstance.current.update({
      width: form.size,
      height: form.size,
      data:  getFullTarget(),
      qrOptions: { errorCorrectionLevel: 'H' },
      dotsOptions: { color: form.color, type: form.dotStyle },
      image: reader,
    })

    return () => reader && URL.revokeObjectURL(reader)
  }, [form])








  //  ██╗ ██╗  ██╗ ██╗  ██╗ ██╗  ██╗ ██╗  ██╗ ██╗ 
  // ████████╗████████╗████████╗████████╗████████╗
  // ╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝
  // ████████╗████████╗████████╗████████╗████████╗
  // ╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝
  //  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝ 
                                               
  return (
    <div className="flex flex-col px-6 py-10 overflow-x-hidden h-full 
    lg:h-auto
    
    sm:my-0
    md:my-0
    lg:my-0
    xl:my-auto
    ">
    
      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Create New QR Code
      </h2>

      <div className="w-1/2 mx-auto">
        {/* ────────────────── Form Card ────────────────── */}
        
        <form onSubmit={handleSubmit}>
          <Card
          >
            <CardHeader>
              <CardTitle>QR Code Details</CardTitle>
            </CardHeader>

              
            <CardContent className="space-y-6">
              {/* Slug & Target */}
              
              <div
              style={{
                width: form.size,
                height: form.size,
                borderRadius: form.shape === 'circle' ? '50%' : '0px',
                overflow: 'hidden',
              }}
              className="flex items-center justify-center bg-muted rounded-lg
              mx-auto"
              >
                <div ref={qrRef} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="slug" className="mb-1 block">
                    Slug (path)
                  </Label>
                  <Input
                    required
                    id="slug"
                    placeholder="summer-sale"
                    value={form.slug}
                    onChange={handleChange('slug')}
                    style={{
                      borderColor: slugExists? '#ce1f1f' : '#3B3B4D',
                    }}

                  />
                </div>
                <div>
                  <Label htmlFor="target" className="mb-1 block">
                    Destination URL
                  </Label>
                  <Input
                    required
                    id="target"
                    placeholder="https://example.com"
                    value={form.target}
                    onChange={handleChange('target')}
                  />
                </div>
              </div>

              {/* Color, Size, Dynamic */}
              <div className="flex">
                <div className='w-1/3'
                >
                  <Label htmlFor="color" className="mb-1 block">
                    Color
                  </Label>
                  <Input
                    id="color"
                    type="color"
                    value={form.color}
                    onChange={handleChange('color')}
                    className="h-10 p-1"
                  />
                </div>
                
                <div className='mx-auto'
                >
                  <Label className="mb-1 block">Dot Style</Label>
                  <Select
                    value={form.dotStyle}
                    onValueChange={(v) => setForm((p) => ({ ...p, dotStyle: v }))}
                  >
                    <SelectTrigger>{form.dotStyle}</SelectTrigger>
                    <SelectContent>
                      {DOT_STYLES.map((style) => (
                        <SelectItem key={style} value={style} className="capitalize">
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
              </div>

              

              
            
              
            </CardContent>

            <CardFooter>
              <Button type="submit" className="ml-auto">
                Create QR Code
              </Button>
            </CardFooter>
          </Card>
        </form>

        
      </div>
    </div>
  )
}

export default CreateQRCodeSection
