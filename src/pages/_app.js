
import Background from "@/components/misc-comps/background";
import Navbar from "@/components/navbar-comps/navbar";
import { AppProvider } from "@/context/app-context";
import "@/styles/globals.css";


export default function App({ Component, pageProps }) {
  return (
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
  ) 
    
}
