import { sendToTheGiver } from '@/helper-functions/contact-giver';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { createContext, useContext, useState,useEffect } from 'react';





const AppContext = createContext();

export const AppProvider = ({ children }) => {

  
  
  //       ███████╗████████╗ █████╗ ████████╗███████╗███████╗      
  //       ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝      
  // █████╗███████╗   ██║   ███████║   ██║   █████╗  ███████╗█████╗
  // ╚════╝╚════██║   ██║   ██╔══██║   ██║   ██╔══╝  ╚════██║╚════╝
  //       ███████║   ██║   ██║  ██║   ██║   ███████╗███████║      
  //       ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝      
  
  const router = useRouter()
  const {user,isLoading} = useUser()
  const [userData, setUser] = useState(null);
  const [qrCodes, setQrCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [currentPanel,setCurrentPanel] = useState('overview')
  const [recentCodes,setRecentCodes] = useState([])
  

  // █████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗
  // ╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝                                                                   
  // █████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗
  // ╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝



  //        █████╗ ██╗   ██╗████████╗██╗  ██╗ ██████╗       
  //       ██╔══██╗██║   ██║╚══██╔══╝██║  ██║██╔═████╗      
  // █████╗███████║██║   ██║   ██║   ███████║██║██╔██║█████╗
  // ╚════╝██╔══██║██║   ██║   ██║   ██╔══██║████╔╝██║╚════╝
  //       ██║  ██║╚██████╔╝   ██║   ██║  ██║╚██████╔╝      
  //       ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝ ╚═════╝       
                                                         
  

  const sendToLogin = () => {
    router.push('/api/auth/login')
  }


  const sendToLogout = () => {
    router.push('/api/auth/logout')
  }




  //       ███████╗██╗   ██╗███╗   ██╗ ██████╗███████╗      
  //       ██╔════╝██║   ██║████╗  ██║██╔════╝██╔════╝      
  // █████╗█████╗  ██║   ██║██╔██╗ ██║██║     ███████╗█████╗
  // ╚════╝██╔══╝  ██║   ██║██║╚██╗██║██║     ╚════██║╚════╝
  //       ██║     ╚██████╔╝██║ ╚████║╚██████╗███████║      
  //       ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝╚══════╝      
  
  
  
  // user functions
  const addUser = async() => {
    const command = 'add-user'
    const data = {
      authId:userData.authId,
      username: userData.username,
      role:'free'
    }

    const response = await sendToTheGiver(command,data)

  }

  const getUserData = async() => {
    
    const command = 'get-user'
    const data = {
      username:user.name
    }


    const response = await sendToTheGiver(command,data)
    

    if (response.success) {
      setTimeout(() => {
        setUser(response.user)
      }, 2000);
    } 
  }


  const getRecentCodes = async() => {
    const recentSlugs = userData.meta.recentScans 
    const holder = []
    

    if (recentSlugs.length === 0) {
      return
    }
    recentSlugs.forEach((slug,index) => {
      qrCodes.forEach((code) => {
        if (code.slug === slug) {
          holder.push(code)
        }
      })
    })

    holder.reverse()

    setRecentCodes(holder)
  }


  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // ########################################

  // qr functions

  const createQrCode = async(data) => {
    const response = await sendToTheGiver('create-qr',data)
  }

  const getQrCodes = async() => {
    

    const command = 'get-user-qr-codes'
    const data = {
      ownerId: userData.authId
    }
    
    const response = await sendToTheGiver(command,data)
    
    if (response.success) {
      setQrCodes(response.qrCodes)
    } 
    
  }

  const updateQrCode = async() => {

    const command = 'update-qr'
    const data = {
      username:userData.username,
      slug:selectedCode.slug,
      updatedQr:selectedCode
    }

    const response = await sendToTheGiver(command, data)
    
  }

  const changeQrStatus = async(newStatus) => {
    const copy = {...selectedCode}
    copy.status = newStatus
    setSelectedCode(copy)
  }

  
  const destroyQrCode = async() => {

    const command = 'delete-qr'
    const data = {
      username:userData.username,
      slug:selectedCode.slug
    }

    const response = await sendToTheGiver(command, data)
    
    if (response.success) {
      activatePanel('qr-codes')
    }

  }


  

  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // ########################################

  // miscellaneous functions
  const activatePanel = (panelName) => {
    setCurrentPanel(panelName)
  }


  const checkSlugExists = async(data) => {
    const response = await sendToTheGiver('slug-exists',data)
    return response
  }

  const quickUpdate = async() => {

  }

  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // ########################################
  



  



  

  
  
  // █████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗
  // ╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝                                                                   
  // █████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗
  // ╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝




  // ██╗   ██╗██╗   ██╗██╗   ██╗██╗   ██╗██╗   ██╗██╗   ██╗██╗   ██╗
  // ██║   ██║██║   ██║██║   ██║██║   ██║██║   ██║██║   ██║██║   ██║
  // ██║   ██║██║   ██║██║   ██║██║   ██║██║   ██║██║   ██║██║   ██║
  // ╚██╗ ██╔╝╚██╗ ██╔╝╚██╗ ██╔╝╚██╗ ██╔╝╚██╗ ██╔╝╚██╗ ██╔╝╚██╗ ██╔╝
  //  ╚████╔╝  ╚████╔╝  ╚████╔╝  ╚████╔╝  ╚████╔╝  ╚████╔╝  ╚████╔╝ 
  //   ╚═══╝    ╚═══╝    ╚═══╝    ╚═══╝    ╚═══╝    ╚═══╝    ╚═══╝  
                                                                 
  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user]);


  useEffect(() => {
    if (selectedCode) {
      updateQrCode()
    }
  }, [selectedCode]);

  useEffect(() => {
    if (qrCodes.length > 0) {
      getRecentCodes();
    }
  }, [qrCodes]);

  useEffect(() => {
    if (userData) {
      getQrCodes();
    }
  }, [userData,currentPanel]);


                                                                          
  // █████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗
  // ╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝                                                                   
  // █████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗
  // ╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝
                                                                          
                                                                          
                                                                          
  return (
    <AppContext.Provider
      value={{
        user,
        userData,
        qrCodes,
        currentPanel,
        selectedCode,
        recentCodes,
        setUser,
        setSelectedCode,
        addUser,
        activatePanel,
        changeQrStatus,
        createQrCode,
        destroyQrCode,
        checkSlugExists,
        sendToLogin,
        sendToLogout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
