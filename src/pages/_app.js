
import Background from "@/components/misc-comps/background";
import Navbar from "@/components/navbar-comps/navbar";
import { AppProvider } from "@/context/app-context";
import "@/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0";


export default function App({ Component, pageProps }) {
  return (
    <UserProvider >
    <AppProvider>
      <div className="min-h-screen
      relative"
      >
        <Background />
        <div className='relative z-10'
        >

          <Navbar />
          <Component {...pageProps}/>
        </div>
      </div>
    </AppProvider>
    </UserProvider>
  ) 
    
}
