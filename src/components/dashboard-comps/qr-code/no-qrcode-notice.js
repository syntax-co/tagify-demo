import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/context/app-context";
import { IoAdd } from "react-icons/io5";




const NoQrCode = () => {

    const {activatePanel} = useAppContext();

    const handleClick = () => {
        activatePanel('creating')
    }

    return (
        <div className='h-1/3 my-10
        '
        >
            <Card className='h-1/3 flex items-center'
            >
                <CardContent className='px-8 py-4 flex w-full'
                >
                    <div className=" font-bold text-2xl
                    "
                    >
                        There are no QR codes yet
                    </div>

                    <div className='ml-auto cursor-pointer
                    font-light bg-primary rounded-md
                    flex items-center p-2
                    hover:bg-accent
                    '

                    onClick={handleClick}
                    >
                        <IoAdd className='mx-1'
                        size={20}
                        />
                        New QR
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
 
export default NoQrCode;