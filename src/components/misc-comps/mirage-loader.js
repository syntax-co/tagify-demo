import { Mirage } from 'ldrs/react'
import 'ldrs/react/Mirage.css'



const MirageLoader = () => {
    return (
        <div className="flex-1
        flex items-center justify-center
        bg-background h-[92vh]
    
        "
        >
            <Mirage
            size="100"
            speed="2.5"
            color="white" 
            />
        </div>
    );
}
 
export default MirageLoader;