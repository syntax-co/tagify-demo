import Link from "next/link";
import { Menu, UserCircle } from "lucide-react";
import { useAppContext } from "../../context/app-context";
import { useState, useRef, useEffect } from "react";
import BouncyLoader from "../misc-comps/bouncy-loader";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { CiUser } from "react-icons/ci";

const UserMenu = () => {
  const router = useRouter()
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hovering,setHovering] = useState(false)

  const userButtons = {
    'dashboard':{
      path:'/dashboard'
    }
  }


  const hoverVariants = {
    initial:{
      backgroundColor:'#373737',
      color:'#E5E5E5'
    },
    whileHover:{
      backgroundColor:'#E5E5E5',
      color:'#373737'
    }
  }

  

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return(
    <motion.div ref={dropdownRef} key='user-menu' 
    className="relative 
    flex justify-end
    "        
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    >

      

      <motion.button
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="p-1 h-auto cursor-pointer rounded-md
      border border-foreground"

      initial={{backgroundColor:'#2e2e2e',color:'#E5E5E5',borderColor:'#E5E5E5'}}
      animate={{
        backgroundColor:hovering||dropdownOpen? '#FF5754':'#2e2e2e',
        color: hovering||dropdownOpen? '#373737':'#E5E5E5',
        borderColor: hovering||dropdownOpen? '#2e2e2e':'#E5E5E5',
      }}

      onMouseEnter={() => {setHovering(true)}}
      onMouseLeave={() => {setHovering(false)}}
      >

        <CiUser className="" 
        size={30}
        />
      </motion.button>

      <AnimatePresence>
      {
        dropdownOpen && (
        <motion.div className="absolute right-0 top-[120%] w-40 
        overflow-hidden 
        bg-card border  rounded-md shadow-lg z-10"
        
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >

          {
            Object.keys(userButtons).map((key,index) => {
              
              return (
                <motion.div key={'item-'+index}
                  className=" p-2 cursor-pointer"
                  onClick={() =>{router.push("/dashboard")}}

                  variants={hoverVariants}
                  initial='initial'
                  whileHover='whileHover'
                >
                  {key.slice(0,1).toUpperCase() + key.slice(1)}
                </motion.div>
              )
            })
          }

          
        </motion.div>
      )}
      </AnimatePresence>
    </motion.div>
  )
}



export default function Navbar() {
  const router = useRouter()
  const { user } = useAppContext();
  

  return (
    <div className="w-full h-[8vh] flex items-center
    px-24 bg-background border-b border-foreground
    ">
        
      <div className="w-16 aspect-video cursor-pointer
      bg-center bg-contain bg-no-repeat"
      style={{
        backgroundImage:'url(./images/icon.png)'
      }}
      
      onClick={() => {router.push('/')}}
      />
      

      <div className="items-center gap-6 ml-auto
      ">
        {/* <Link href="#features" className="text-sm text-muted-foreground hover:text-black dark:hover:text-white transition">
          Features
        </Link>
        <Link href="" className="text-sm text-muted-foreground hover:text-black dark:hover:text-white transition">
          Pricing
        </Link> */}
        
        <div className="w-12"
        >
          <AnimatePresence mode="wait">
            {
              user ? 
              <UserMenu key='user-menu' />:
              <BouncyLoader key='bouncy-loader' />     
            }
          </AnimatePresence>
          </div>
      </div>

      

    </div>
  );
}
