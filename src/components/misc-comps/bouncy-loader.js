import { motion } from 'framer-motion';
import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'



const BouncyLoader = () => {
    return (
        <motion.div className=''

        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        >
            <Bouncy
            size="35"
            speed="1.75"
            color="white" 
            />
        </motion.div>
    );
}
 
export default BouncyLoader;