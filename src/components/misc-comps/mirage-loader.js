import { Mirage } from 'ldrs/react'
import 'ldrs/react/Mirage.css'

// Default values shown
<Mirage
  size="60"
  speed="2.5"
  color="black" 
/>


const MirageLoader = () => {
    return (
        <div className="flex-1
        flex items-center justify-center
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