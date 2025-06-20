import { sendToTheGiver } from '@/helper-functions/contact-giver';
import { createContext, useContext, useState,useEffect } from 'react';

const AppContext = createContext();


export const AppProvider = ({ children }) => {


  //       ███████╗████████╗ █████╗ ████████╗███████╗███████╗      
  //       ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝      
  // █████╗███████╗   ██║   ███████║   ██║   █████╗  ███████╗█████╗
  // ╚════╝╚════██║   ██║   ██╔══██║   ██║   ██╔══╝  ╚════██║╚════╝
  //       ███████║   ██║   ██║  ██║   ██║   ███████╗███████║      
  //       ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝      
                                                                
  const [user, setUser] = useState(null);
  const [qrCodes, setQrCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [currentPanel,setCurrentPanel] = useState('overview')
  const [recentCodes,setRecentCodes] = useState([])
  

  // █████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗
  // ╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝                                                                   
  // █████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗
  // ╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝




  




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
      authId:user.authId,
      username: user.username,
      role:'free'
    }

    const response = await sendToTheGiver(command,data)

  }

  const getUser = async() => {

    const command = 'get-user'
    const data = {
      username:'mini-pinata'
    }

    const response = await sendToTheGiver(command,data)
    

    if (response.success) {
      setUser(response.user)
    } 
  }


  const getRecentCodes = async() => {
    const recentSlugs = user.meta.recentScans 
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
    console.log(response)
  }

  const getQrCodes = async() => {

    const command = 'get-user-qr-codes'
    const data = {
      ownerId: user.authId
    }
    
    const response = await sendToTheGiver(command,data)
    
    if (response.success) {
      setQrCodes(response.qrCodes)
    } 
    
  }

  const updateQrCode = async() => {

    const command = 'update-qr'
    const data = {
      username:user.username,
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
      username:user.username,
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
    getUser();
  }, []);


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
    if (user) {
      getQrCodes();
    }
  }, [user,currentPanel]);


                                                                          
  // █████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗
  // ╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝                                                                   
  // █████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗
  // ╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝
                                                                          
                                                                          
                                                                          
  return (
    <AppContext.Provider
      value={{
        user,
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
        checkSlugExists
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
