import Navbar from "@/components/navbar-comps/navbar";
import { AppProvider } from "@/context/app-context";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <div className="min-h-screen"
      >
        <Navbar />
        <Component {...pageProps}/>
      </div>
    </AppProvider>
  ) 
    
}
